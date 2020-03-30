import React, { useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

export default function AppForm(props) {
  const formRef = useRef(null);
  const { onSubmit, initialData, validateFunc, validateSchema, className, translateFunc } = props;

  async function handleSubmit(data) {
    if (translateFunc) data = translateFunc(data);
    if (!validateSchema && !validateFunc) return onSubmit(data);
    try {
      await validateSchema.validate(data, {
        abortEarly: false
      });
      // Validation passed
      // check if additional validationFunc
      if (validateFunc) {
        if (validateFunc(setFormErr, setFieldErr, data)) {
          return onSubmit(data);
        } else {
          // Validation failed
          return false;
        }
      }
      return onSubmit(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        setFormErr(formRef, err);
      }
    }
  }

  const childrenWithProps = React.Children.map(props.children, child => React.cloneElement(child, { form: formRef }));

  return (
    <Form onSubmit={handleSubmit} initialData={initialData} ref={formRef} className={className}>
      {childrenWithProps}
    </Form>
  );
}

export function setFormErr(formRef, errors) {
  // Set all errors
  formRef.current.setErrors(errors);
}

export function setFieldErr(formRef, fieldName, error) {
  // Set single field error
  formRef.current.setFieldError(fieldName, error);
}
