import React, { useState, useEffect } from 'react';

interface IProps {
  text: string;
  texthighlited: string;
}

const TextWrapper: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="read-more-main-wrapper-text">
      <span className="read-more-main-wrapper-text__textvalue">
        {props.text}
      </span>
    </div>
  );
};

export default TextWrapper;
