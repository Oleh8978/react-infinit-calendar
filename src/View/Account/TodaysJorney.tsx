import React from 'react';
import WavePercentage from 'Component/WavePercentage';

/// hardcoded data
import imgleft from './static/tasks.svg';
import imgRight from './static/hours.svg';

interface IProps {}

const TodaysJourney: React.FC<IProps> = () => {
  return (
    <div className={'profile-journey'}>
      <div className={'profile-journey-progress'}>
        <span className={'profile-journey-progress-header'}>
          Todays progress
        </span>
        <div className={'profile-journey-progress-wrapper'}>
          <div className={'profile-journey-progress__left'}>
            <div className={'profile-journey-progress__left-imgwrapper'}>
              <WavePercentage bubbleValue='H' neededPercent={45}/>
            </div>
            <div className={'profile-journey-progress__left-textwrapper'}>
              <span
                className={'profile-journey-progress__left-textwrapper__top'}>
                17.5 / 40.5
              </span>
              <span
                className={
                  'profile-journey-progress__left-textwrapper__bottom'
                }>
                hrs spent
              </span>
            </div>
          </div>
          <div className={'profile-journey-progress__right'}>
            <div className={'profile-journey-progress__right-imgwrapper'}>
              <WavePercentage bubbleValue='T' neededPercent={60} isGreen={true}/>
            </div>
            <div className={'profile-journey-progress__right-textwrapper'}>
              <span
                className={'profile-journey-progress__right-textwrapper__top'}>
                6 / 10
              </span>
              <span
                className={
                  'profile-journey-progress__right-textwrapper__bottom'
                }>
                tasks
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysJourney;
