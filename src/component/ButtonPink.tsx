import React, { useState, useEffect } from 'react';

interface IProps {
  text: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
  marginBottom: string;
  eventHandler: () => void;
}

const PinkCustomButton: React.FC<IProps> = ({ ...props }) => {
  return (
    <div
      className={'button-pink'}
      style={{
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
      }}
      onClick={() => props.eventHandler()}>
      <span>{props.text}</span>
    </div>
  );
};

export default PinkCustomButton;
