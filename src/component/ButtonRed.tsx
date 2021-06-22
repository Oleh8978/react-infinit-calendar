import React, { useState, useEffect } from 'react';

interface IProps {
  text: string;
  eventHandler: () => void;
}

const ButtonRed: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'btn-red'}>
        <span className={'btn-red-text'}>{props.text}</span>
    </div>
  );
};

export default ButtonRed;