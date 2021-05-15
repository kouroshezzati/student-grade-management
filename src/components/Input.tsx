import React, { Component } from 'react';

interface InputProps {
  label: string;
  value: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  error: boolean;
}

export default React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, value, onChange, error } = props;
  const id: string = 'label' + Math.floor(Math.random() * 1000);
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        ref={ref}
        className={error ? 'error' : ''}
      />
      {error && <div className="error-message">Field is required!</div>}
    </div>
  );
});
