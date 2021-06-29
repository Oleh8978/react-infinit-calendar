import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import WavePercentage from '@app/component/WavePercentage';
import { dataModulesProgress } from './hardcodedData/data';

// components
import Loader from '@app/component/Loader';

// Actions
import { getStatisticToday } from '@app/controller/statistic/actions';

// interfaces
import { IModuleProgress } from './Models';
import { IStore } from '@app/controller/model';

interface IProps {}

const TodaysJourney: React.FC<any> = ({ ...props }) => {
  const [statistic, setStatistic] = useState<any>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.statistic === undefined || props.statistic.spent === 0) {
      dispatch(getStatisticToday.request({}));
    }

    if (props.statistic.today !== undefined && statistic === undefined) {
      setStatistic(props.statistic);
    }
  }, [props.statistic.today]);
  return (
    <>
      {statistic ? (
        <div className={'profile-journey'}>
          <div className={'profile-journey-progress'}>
            <span className={'profile-journey-progress-header'}>
              Todays progress
            </span>
            <div className={'profile-journey-progress-wrapper'}>
              <div className={'profile-journey-progress__left'}>
                <div className={'profile-journey-progress__left-imgwrapper'}>
                  <WavePercentage
                    bubbleValue="H"
                    neededPercent={
                      statistic.today.spent > 0 && statistic.today.maxSpent
                        ? Math.round(
                            (statistic.today.spent / statistic.today.maxSpent) * 100,
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
                    {statistic.today.spent} / {statistic.today.maxSpent}
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
                    {statistic.today.completedTaskCount} /{' '}
                    {statistic.today.maxTaskCount}
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
}))(TodaysJourney);
