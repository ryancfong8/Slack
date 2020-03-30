import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import Toggle from 'react-toggle';

export default function ToggleComponent({ name, onChange, form, ...rest }) {
  const toggleRef = useRef(null);
  const { fieldName, defaultValue = false, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: toggleRef.current.input,
      path: 'value'
    });
  }, [fieldName, registerField]);
  const handleChange = e => {
    form.current.setFieldValue(fieldName, e.target.checked);
    onChange();
  };
  return <Toggle ref={toggleRef} defaultValue={defaultValue} {...rest} onChange={handleChange} />;
}
