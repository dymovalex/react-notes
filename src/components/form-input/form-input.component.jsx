import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ label, value, handleChange, ...otherProps }) => {
  return (
    <div className='form-input'>
      <input className='form-input__input' onChange={handleChange} {...otherProps} />
      <label className={`${value ? 'shrink' : ''} form-input__label`}>
        {label}
      </label>
    </div>
  );
};

export default FormInput;