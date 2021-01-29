import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ fieldError, icon, inputClassName, labelName, onChange, placeholder, subLabel, subtitle }) => (
  <div className="d-flex flex-column mb-3">
    <label htmlFor={labelName} className="mb-1">
      {labelName}
      {subLabel}
    </label>
    {fieldError && <div className="text-danger mb-1">{fieldError}</div>}
    <div className={icon && 'channel-input-container'}>
      <input
        id={labelName}
        name={labelName}
        placeholder={placeholder}
        className={inputClassName}
        onChange={onChange}
        autoComplete="off"
      />
      {icon}
    </div>
    {subtitle && <div className="subtitle optional">{subtitle}</div>}
  </div>
);

export default Input;

Input.propTypes = {
  /** fieldError displays the error string */
  fieldError: PropTypes.string,
  /** icon to be rendered, commonly positioned absolute relative to the input */
  icon: PropTypes.element,
  /** inputClassName is the className for the input element */
  inputClassName: PropTypes.string,
  /** labelName for the input, required */
  labelName: PropTypes.string.isRequired,
  /** onChange is the function to be called when input changes, required */
  onChange: PropTypes.func.isRequired,
  /** placeholder text for input */
  placeholder: PropTypes.string,
  /** subLabel is rendered with the labelName in the label*/
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** subtitle is rendered under the input element */
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};
