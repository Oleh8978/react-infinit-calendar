import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  price?: number;
  trialPeriod?: number;
  setIsStartPopup: (boolean) => void;
  setIsStopPopup: (boolean) => void;
  setStartConnection?: (boolean) => void;
  setStopConnection?: (boolean) => void;
  isTrialPeriodStarted: boolean;
  hasTrialPeriod: boolean;
  id: number;
  trialEndDate?: Date;
  isPaid: boolean;
  isConnected: boolean;
  needToPay?: boolean;
}

const JourneyFixedBottom: React.FC<any> = ({ ...props }) => {
  const difference = Math.abs(
    new Date(props.trialEndDate).getTime() - new Date().getTime(),
  );
  console.log('props ', props);
  const days = Math.round(difference / (1000 * 3600 * 24));
  return (
    <>
      {props.isTrialPeriodStarted ? (
        days > 0 ? (
          <span className="trial-info">
            {`Your Trial Ends in ${days} Days`}
          </span>
        ) : (
          <span className="trial-info trial-info-error">
            Your trial has expired
          </span>
        )
      ) : (
        <></>
      )}

      <div className="jorneydiscoveymain-bottom">
        {props.isPaid ? (
          props.isConnected ? (
            <button
              className="jorneydiscoveymain-bottom-red jorneydiscoveymain-bottom-pink"
              onClick={() => props.setIsStopPopup(true)}>
              <span className="jorneydiscoveymain-bottom-pink-text">
                Stop This Journey
              </span>
            </button>
          ) : (
            <button className="jorneydiscoveymain-bottom-pink">
              <span
                className="jorneydiscoveymain-bottom-pink-text"
                onClick={() => props.setStartConnection(true)}>
                Start This Journey
              </span>
            </button>
          )
        ) : props.hasTrialPeriod || !props.needToPay ? (
          props.isConnected ? (
            <button
              className="jorneydiscoveymain-bottom-red jorneydiscoveymain-bottom-pink"
              onClick={() => props.setIsStopPopup(true)}>
              <span className="jorneydiscoveymain-bottom-pink-text">
                Stop This Journey
              </span>
            </button>
          ) : props.needToPay ? (
            <button
              className="jorneydiscoveymain-bottom-pink"
              onClick={() => props.setIsStartPopup(true)}>
              <span className="jorneydiscoveymain-bottom-pink-text">
                Start {props.trialPeriod}-Day Trial Version
              </span>
            </button>
          ) : (
            <>
              {!props.hasTrialPeriod ? (
                <button
                  className="jorneydiscoveymain-bottom-pink"
                  onClick={() => props.setStartConnection(true)}>
                  <span className="jorneydiscoveymain-bottom-pink-text">
                    Start This Journey
                  </span>
                </button>
              ) : (
                <button
                  className="jorneydiscoveymain-bottom-pink"
                  onClick={() => props.setIsStartPopup(true)}>
                  <span className="jorneydiscoveymain-bottom-pink-text">
                    Start {props.trialPeriod}-Day Trial Version
                  </span>
                </button>
              )}
            </>
          )
        ) : (
          <></>
        )}

        {props.isPaid ? (
          <div className="jorneydiscoveymain-bottom-info">
            <span className="jorneydiscoveymain-bottom-info-text">
              Already Purchased
            </span>
          </div>
        ) : props.price && props.price !== 0 ? (
          <Link
            to={`${props.id}/checkout`}
            className="jorneydiscoveymain-bottom-pink-full">
            <span className="jorneydiscoveymain-bottom-pink-full-text">
              Purchase Full Journey for Only
            </span>
            <span className="jorneydiscoveymain-bottom-pink-full-text-price">
              ${props.price}
            </span>
          </Link>
        ) : (
          <div className="jorneydiscoveymain-bottom-info">
            <span className="jorneydiscoveymain-bottom-info-text">Free</span>
          </div>
        )}
      </div>
    </>
  );
};

export default JourneyFixedBottom;
