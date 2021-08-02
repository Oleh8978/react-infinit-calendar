import React, { useState } from 'react';

interface IProps {
  text: string;
}

const TextComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className="overview-textcomponent">
        <span className="overview-textcomponent-text">{props.text}</span>
      </div>
    </>
  );
};

export default TextComponent;
