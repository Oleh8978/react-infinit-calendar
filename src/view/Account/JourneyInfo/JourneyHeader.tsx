import React from 'react';

interface IProps {
  img?: string;
}

const JourneyHeader: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'journeyinfo-body-header'}>
      <img
        src={props.img}
        className={'journeyinfo-body-header-img'}
        alt="img"
      />
    </div>
  );
};

export default JourneyHeader;
