import React, { useState, useEffect } from 'react';

interface IProps {
  text: string;
  eventHandler: () => void;
}

const DeletePageBTN: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'btn-account-delete'}>
      <span className={'btn-account-delete-text'}>{props.text}</span>
    </div>
  );
};

export default DeletePageBTN;