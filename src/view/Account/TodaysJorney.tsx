import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import WavePercentage from '@app/component/WavePercentage';

// components
import Loader from '@app/component/Loader';

import { IStore } from '@app/controller/model';

// utils
import { hoursConverter } from './utils';

interface IProps {}

const TodaysJourney: React.FC<any> = ({ ...props }) => {
  const statistic = props.data;

  const mathConverter = (argument: any) => {
    if (Number.isInteger(argument)) {
      return argument;
    }
    return Number.parseFloat(argument).toFixed(1);
  };

  return (
    <>
      {statistic !== undefined ? (
        <div className={'profile-journey'}>
          <div className={'profile-journey-progress'}>
            <span className={'profile-journey-progress-header'}>
              Today's progress
            </span>
            <div className={'profile-journey-progress-wrapper'}>
              <div className={'profile-journey-progress__left'}>
                <div className={'profile-journey-progress__left-imgwrapper'}>
                  <WavePercentage
                    bubbleValue="H"
                    neededPercent={
                      statistic.today.spent > 0 && statistic.today.maxSpent > 0
                        ? Math.round(
                            (statistic.today.spent / statistic.today.maxSpent) *
                              100,
                          )
                        : 1
                    }
                  />
                </div>
                <div className={'profile-journey-progress__left-textwrapper'}>
                  <span
                    className={
                      'profile-journey-progress__left-textwrapper__top'
                    }>
                    {statistic.today.spent > 0 && statistic.today.maxSpent > 0
                      ? mathConverter(statistic.today.spent / 60) + ' '
                      : 'N'}
                    /
                    {statistic.today.maxSpent > 0 && statistic.today.spent > 0
                      ? ' ' + mathConverter(statistic.today.maxSpent / 60)
                      : 'A'}
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
                  <WavePercentage
                    bubbleValue="T"
                    neededPercent={
                      statistic.today.completedTaskCount > 0 &&
                      statistic.today.maxTaskCount > 0
                        ? Math.round(
                            (statistic.today.completedTaskCount /
                              statistic.today.maxTaskCount) *
                              100,
                          )
                        : 1
                    }
                    isGreen={true}
                  />
                </div>
                <div className={'profile-journey-progress__right-textwrapper'}>
                  <span
                    className={
                      'profile-journey-progress__right-textwrapper__top'
                    }>
                    <>
                      {statistic.today.completedTaskCount > 0 ? (
                        <>
                          {statistic.today.completedTaskCount}/
                          {statistic.today.maxTaskCount}
                        </>
                      ) : (
                        <>{'N/A'}</>
                      )}
                    </>
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
      ) : (
        <Loader isSmall={true} styleComp={50} />
      )}
    </>
  );
};

// export default TodaysJourney;
export default connect((state: IStore) => ({
  statistic: state.statisticReducer.statisticToday,
  loader: state.statisticListReducer.loaderState.status,
}))(TodaysJourney);
