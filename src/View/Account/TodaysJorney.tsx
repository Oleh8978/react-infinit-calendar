import React, { useState } from 'react';
import WavePercentage from '@app/component/WavePercentage';
import { dataModulesProgress } from './hardcodedData/data';

// interfaces
import { IModuleProgress } from './Models';

interface IProps {}

const TodaysJourney: React.FC<IProps> = () => {
  const [data, setData] = useState<IModuleProgress>(dataModulesProgress);

  return (
    <div className={'profile-journey'}>
      <div className={'profile-journey-progress'}>
        <span className={'profile-journey-progress-header'}>
          Todays progress
        </span>
        <div className={'profile-journey-progress-wrapper'}>
          <div className={'profile-journey-progress__left'}>
            <div className={'profile-journey-progress__left-imgwrapper'}>
              <WavePercentage bubbleValue='H' neededPercent={Math.round(data.hoursSpent / data.hoursGeneral * 100)}/>
            </div>
            <div className={'profile-journey-progress__left-textwrapper'}>
              <span
                className={'profile-journey-progress__left-textwrapper__top'}>
                {data.hoursSpent} / {data.hoursGeneral}
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
              <WavePercentage bubbleValue='T' neededPercent={Math.round(data.tasksDone / data.tasksGeneral * 100)} isGreen={true}/>
            </div>
            <div className={'profile-journey-progress__right-textwrapper'}>
              <span
                className={'profile-journey-progress__right-textwrapper__top'}>
                {data.tasksDone} / {data.tasksGeneral}
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
