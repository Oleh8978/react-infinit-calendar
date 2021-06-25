import React, { useEffect, useState } from 'react';
import moment from 'moment';
//import Link from '@app/routing/Link';
import { Link } from 'react-router-dom';
import { Pages } from '@app/routing/schema';

interface IProps {
  price?: number;
  trialPeriod?: number;
  setIsStartPopup: (boolean) => void;
  setIsStopPopup: (boolean) => void;
  isTrialPeriodStarted: boolean;
  hasTrialPeriod: boolean;
  id: number;
}

const JourneyFixedBottom: React.FC<IProps> = ({ ...props }) => {

  return (
      <div className='jorneydiscoveymain-bottom'>
        {props.trialPeriod && props.trialPeriod !== 0 ? (
            props.isTrialPeriodStarted ? (
                <button className='jorneydiscoveymain-bottom-red jorneydiscoveymain-bottom-pink' onClick={() => props.setIsStopPopup(true)}>
            <span className='jorneydiscoveymain-bottom-pink-text'>
              Stop This Journey
            </span>
                </button>
              ) : (
              props.price && props.price !== 0 ? (
                props.hasTrialPeriod ? (
                  <button className='jorneydiscoveymain-bottom-pink' onClick={() => props.setIsStartPopup(true)}>
                  <span className='jorneydiscoveymain-bottom-pink-text'>
                      Start {props.trialPeriod}-Day Trial Version
                  </span>
                  </button>
                ) : (<></>)
            ) : (
                <button className='jorneydiscoveymain-bottom-pink'>
                  <span className='jorneydiscoveymain-bottom-pink-text'>
                      Start This Journey
                  </span>
                </button>
              )
        )) : (
          <></>
        )}
        {props.price && props.price !== 0 ? (
          <Link to={`${props.id}/checkout`} className='jorneydiscoveymain-bottom-pink-full'>
            <span className='jorneydiscoveymain-bottom-pink-full-text'>
              Purchase Full Journey for Only
            </span>
            <span className='jorneydiscoveymain-bottom-pink-full-text-price'>
         ${props.price}
            </span>
          </Link>
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
