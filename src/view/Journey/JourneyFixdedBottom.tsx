import React, { useEffect, useState } from 'react';
import ConfirmationWindow from '@app/component/modalWindow/confirmationWindow';

interface IProps {
  price?: number;
  trialPeriod?: number;
  setIsStartPopup: (boolean) => void;
  setIsStopPopup: (boolean) => void;
}

const JourneyFixedBottom: React.FC<IProps> = ({ ...props }) => {
 // const [isStartPopup, setIsStartPopup] = useState<boolean>(false);
 // const [isStopPopup, setIsStopPopup] = useState<boolean>(false);

  return (
    <>
    { props.price && props.price !== 0 ? (
        <div className='jorneydiscoveymain-bottom'>
          <button className='jorneydiscoveymain-bottom-pink' onClick={() => props.setIsStartPopup(true)}>
        <span className='jorneydiscoveymain-bottom-pink-text'>
          Start {props.trialPeriod}-Day Trial Version
        </span>
          </button>
          <button className='jorneydiscoveymain-bottom-pink-full'>
        <span className='jorneydiscoveymain-bottom-pink-full-text'>
          Purchase Full Journey for Only
        </span>{' '}
            <span className='jorneydiscoveymain-bottom-pink-full-text-price'>
        {' '}${props.price}
        </span>
          </button>
        </div>
      ) : (
        <div className='jorneydiscoveymain-bottom'>
          <button className='jorneydiscoveymain-bottom-pink' onClick={() => props.setIsStartPopup(true)}>
            <span className='jorneydiscoveymain-bottom-pink-text'>
              Start This Journey
            </span>
          </button>
          <div className='jorneydiscoveymain-bottom-pink-full'>
            <span className='jorneydiscoveymain-bottom-pink-full-text'>
              Free
            </span>
          </div>
        </div>
      )
    }
    </>
  );
};

export default JourneyFixedBottom;
