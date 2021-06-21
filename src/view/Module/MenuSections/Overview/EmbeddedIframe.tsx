import React from 'react';

interface IProps {
  content: any;
}

const EmbeddedIframe: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className="overview-iframe">
        {props.content}
      </div>
    </>
  );
};

export default EmbeddedIframe;
