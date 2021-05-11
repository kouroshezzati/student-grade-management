import React, { Component } from 'react';

interface IProps {
  type?: 'default' | 'primary';
  onClick?(): void;
}

export class ButtonComponent extends Component<IProps> {
  render() {
    const { children, type, onClick } = this.props;
    return (
      <button className={`button-${type || 'default'}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default ButtonComponent;
