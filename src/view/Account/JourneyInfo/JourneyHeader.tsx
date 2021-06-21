import React from 'react';

// hardcoded
import img from './hardcoded/journeyMain.png';

interface IProps {}

const JourneyHeader: React.FC<IProps> = () => {
  return (
    <div className={'journeyinfo-body-header'}>
      <img src={img} className={'journeyinfo-body-header-img'} alt="img" />
    </div>
  );
};

export default JourneyHeader;
