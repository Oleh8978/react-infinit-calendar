import React, { useState, useEffect } from 'react';

interface IProps {
  text: string;
  eventHandler: () => void;
  classes?: string;
}

const DeletePageBTN: React.FC<IProps> = ({ ...props }) => {
  return (
    <div
      className={'btn-account-delete' + props.classes}
      onClick={() => props.eventHandler()}>
      <span className={'btn-account-delete-text'}>{props.text}</span>
    </div>
  );
};

export default DeletePageBTN;
