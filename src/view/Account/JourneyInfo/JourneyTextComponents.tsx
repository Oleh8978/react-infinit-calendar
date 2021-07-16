import React from 'react';

interface IProps {
  data: string | JSX.Element | JSX.Element[];
}

const TextComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'journeyinfo-body-textcomponent'}>
      <span className="journeyinfo-body-textcomponent-text">{props.data}</span>
    </div>
  );
};

export default TextComponent;
