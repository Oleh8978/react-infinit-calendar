import React from 'react';

// components
import NavigationBar from '@app/component/NavigationBar';
import JourneyBody from './JourneyBody';

interface IProps {}

const JourneyInfo: React.FC<IProps> = () => {
  return (
    <div className={'journeyinfo'}>
      <NavigationBar rout={'account'} name={'Journey info'} hasSaveButton={false}/>
      <JourneyBody />
    </div>
  );
};

export default JourneyInfo;
