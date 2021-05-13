import React, { useState, useEffect } from 'react';
interface IProps {
  onClick: () => void;
  name: string;
  isActive: boolean;
}

const ButtonSubmit: React.FC<IProps> = ({ ...props }) => {
  return (
    <div
      className={props.isActive ? 'btn-submit__active' : 'btn-submit'}
      onClick={() => props.onClick()}>
      <span
        className={
          props.isActive ? 'btn-submit__active-text' : 'btn-submit-text'
        }>
        {props.name}
      </span>
    </div>
  );
};

export default ButtonSubmit;
