import React from 'react';
import parse from 'html-react-parser';

interface IProps {
  data: string | JSX.Element;
  isSubtitle?: boolean;
}

const TextComponent: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      {props.isSubtitle ? (
        <div className={'journeyinfo-body-textcomponent subtitle'}>
          {parse(String(props.data))}
        </div>
      ) : (
        <div className={'journeyinfo-body-textcomponent'}>{props.data}</div>
      )}
    </>
  );
};

export default TextComponent;
