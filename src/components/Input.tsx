import React, { ChangeEventHandler, Component } from 'react';

interface InputProps {
  label: string;
  value: string | number | undefined;
  onChange(value: string | number): any;
  error: boolean;
  type?: Type;
}

type Type = 'text' | 'number';

export default class Input extends Component<InputProps> {
  render() {
    const { label, value, onChange, error, type } = this.props;
    const id: string = 'label' + Math.floor(Math.random() * 1000);
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          type={type || 'text'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          value={value}
        />
        {error && <div>Field is required!</div>}
      </div>
    );
  }
}
