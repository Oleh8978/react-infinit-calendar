import React, { useState } from 'react';

interface IProps {
  text: string;
}

const TipsComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className="overview-tips">
          <span className="overview-tips-text">{props.text}</span>
      </div>
    </>
  );
};

export default TipsComponent;
