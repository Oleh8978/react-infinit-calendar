import React from 'react';

// components
import ButtonRed from 'Component/ButtonRed';

interface IProps {}

const JourneyFooter: React.FC<IProps> = () => {
  const click = () => {
    console.log('click');
  };
  return (
    <div className={'journeyinfo-footer'}>
      <ButtonRed text={'Stop This Journey'} eventHandler={click} />
      <div className="journeyinfo-footer-description">
        {' '}
        <span className={'journeyinfo-footer-description-text'}>Free</span>
      </div>
    </div>
  );
};

export default JourneyFooter;
