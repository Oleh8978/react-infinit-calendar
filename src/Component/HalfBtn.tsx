import React, { useState, useEffect } from 'react';

interface IProps {
  functionality: () => void;
  isLinked?: boolean;
}

const HalfBTNPink: React.FC<IProps> = ({ ...props }) => {
  return (
    <div
      className={
        props.isLinked
          ? 'edditprofile-links-body-item-wrapper__btn-unlink'
          : 'edditprofile-links-body-item-wrapper__btn-wrapper'
      }
      onClick={() => props.functionality()}>
      <span className={'edditprofile-links-body-item-wrapper__btn-wrapper-txt'}>
        {props.isLinked ? 'Unlink' : 'Link'}
      </span>
    </div>
  );
};

export default HalfBTNPink;
