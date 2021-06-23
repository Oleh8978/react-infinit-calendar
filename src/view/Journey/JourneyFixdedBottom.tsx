import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface IProps {
  price?: number;
  trialPeriod?: number;
  setIsStartPopup: (boolean) => void;
  setIsStopPopup: (boolean) => void;
  isTrialPeriodStarted: boolean;
}

const JourneyFixedBottom: React.FC<IProps> = ({ ...props }) => {
  return (
      <div className='jorneydiscoveymain-bottom'>
        {props.trialPeriod && props.trialPeriod !== 0 ? (
            props.isTrialPeriodStarted ? (
                <button className='jorneydiscoveymain-bottom-red' onClick={() => props.setIsStopPopup(true)}>
            <span className='jorneydiscoveymain-bottom-pink-text'>
              Stop This Journey
            </span>
                </button>
              ) : (
                <button className='jorneydiscoveymain-bottom-pink' onClick={() => props.setIsStartPopup(true)}>
            <span className='jorneydiscoveymain-bottom-pink-text'>
              {props.price && props.price !== 0 ? (
                `Start ${props.trialPeriod}-Day Trial Version`
              ) : (`Start This Journey`)}
            </span>
                </button>
              )

        ) : (
          <></>
        )}
        {props.price && props.price !== 0 ? (
          <button className='jorneydiscoveymain-bottom-pink-full'>
            <span className='jorneydiscoveymain-bottom-pink-full-text'>
              Purchase Full Journey for Only
            </span>{' '}
            <span className='jorneydiscoveymain-bottom-pink-full-text-price'>
        {' '}${props.price}
            </span>
          </button>
        ) : (
          <div className='jorneydiscoveymain-bottom-pink-full'>
            <span className='jorneydiscoveymain-bottom-pink-full-text'>
              Free
            </span>
          </div>
        )}
      </div>
  );
};

export default JourneyFixedBottom;
