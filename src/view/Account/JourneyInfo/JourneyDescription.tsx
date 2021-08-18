import React, { useEffect, useState } from 'react';

// components
import JourneyHoursCalculation from './JourneyHoursCalcul';
import Tab from '@app/component/Tab';
import TextComponent from '@app/view/Account/JourneyInfo/JourneyTextComponents';

// dayweeks
import moment from 'moment';

// utils
import uuid from '@app/utils/uuid';

// types
import { JourneyGetResponse } from '@ternala/frasier-types';
import JourneyStatisticTable from '@app/view/Journey/JourneyStatisticTable';
import { generateContent } from '@app/view/Discovery/Article';
import SectionsContent from '@app/component/sectionsContent';

interface IProps {
  journey: JourneyGetResponse;
  statistic?: any;
  isConnected: boolean;
  isEndless?: boolean;
  id: number;
  buttonsHeight?: number;
}

const JourneyDescription: React.FC<IProps> = ({
  journey,
  statistic,
  isConnected,
  id,
  buttonsHeight,
}) => {
  const defaultWeekdays = Array(...Array(7)).map(function (_, i) {
    return moment(i, 'e')
      .startOf('week')
      .isoWeekday(i + 1)
      .format('ddd');
  });
  // console.log('statistic ', statistic)
  const tabData = [
    {
      id: '1',
      tabTitle: 'Modules',
      tabContent: <JourneyStatisticTable data={statistic[id]?.modules || []} />,
    },
    {
      id: '2',
      tabTitle: 'Description',
      tabContent: <SectionsContent journey={journey} />,
    },
  ];

  const lineWidhtReturner = () => {
    return (`${Math.round(statistic[id]?.statistic.maxTaskCount / 100 ) * statistic[id]?.statistic.maxTaskCount}%`)
  }

  const dateReturner = () => {
    if (
      statistic[Object.keys(statistic)[0]] &&
      statistic[Object.keys(statistic)[0]].statistic.endDate !== undefined
    ) {
      return (
        <>
          <div className="journeyinfo-body-progress-numbers-item">
            <span className="journeyinfo-body-progress-numbers">
              {moment(journey.status.trialEndDate).format('MM/DD/YY')}
            </span>
            <span className="journeyinfo-body-progress-numbers-text">
              {'ends'}
            </span>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div
      className={'journeyinfo-body-wrapper'}
      style={{ paddingBottom: buttonsHeight }}>
      <div className={'journeyinfo-body-wrapper-title'}>
        <span className={'journeyinfo-body-wrapper-title-text'}>
          {journey.title}
        </span>
      </div>
      {isConnected && statistic[id]?.statistic?.spent !== undefined && statistic[id]?.statistic?.completedTaskCount !== undefined && statistic[id]?.statistic.maxTaskCount !== 0? <div className="journeyinfo-body-progressbar">
        <div className="journeyinfo-body-progressbar-active" style={{width: lineWidhtReturner()}}></div>
      </div> : <></>}
      {isConnected ? (
        <>
          <div className="journeyinfo-body-progress">
            <div className="journeyinfo-body-progress-line"></div>
            <div className="journeyinfo-body-progress-numbers-wrap">
              {statistic[id]?.statistic?.spent !== undefined &&
              statistic[id]?.statistic?.spent !== 0 ? (
                <div className="journeyinfo-body-progress-numbers-item">
                  <span className="journeyinfo-body-progress-numbers">
                    {Math.round((statistic[id]?.statistic.spent / 60) * 10) /
                      10}
                  </span>
                  {statistic[Object.keys(statistic)[0]] &&
                  statistic[Object.keys(statistic)[0]].statistic.endDate !==
                    undefined ? (
                    <span className="journeyinfo-body-progress-numbers">
                      &nbsp;/{' '}
                      {Math.round(
                        (statistic[id]?.statistic.maxSpent / 60) * 10,
                      ) / 10}
                    </span>
                  ) : (
                    <></>
                  )}
                  <span className="journeyinfo-body-progress-numbers-text">
                    hrs spent
                  </span>
                </div>
              ) : (
                <>
                  <div className="journeyinfo-body-progress-numbers-item">
                    <span className="journeyinfo-body-progress-numbers">
                      {Math.round((statistic[id]?.statistic.spent / 60) * 10) /
                        10 !== 0 ? Math.round((statistic[id]?.statistic.spent / 60) * 10) /
                        10  : 'N/A'}
                    </span>
                    <span className="journeyinfo-body-progress-numbers-text">
                      hrs spent
                    </span>
                  </div>
                </>
              )}

              {statistic[id]?.statistic?.completedTaskCount !== undefined &&
              statistic[id]?.statistic?.completedTaskCount !== 0 &&
              statistic[id]?.statistic.maxTaskCount !== 0 ? (
                <div className="journeyinfo-body-progress-numbers-item">
                  <span className="journeyinfo-body-progress-numbers">
                    {statistic[id]?.statistic.completedTaskCount}
                  </span>
                  {statistic[Object.keys(statistic)[0]] &&
                  statistic[Object.keys(statistic)[0]].statistic.endDate !==
                    undefined ? (
                    <span className="journeyinfo-body-progress-numbers">
                      &nbsp;/ {statistic[id]?.statistic.maxTaskCount}
                    </span>
                  ) : (
                    <></>
                  )}
                  <span className="journeyinfo-body-progress-numbers-text">
                    tasks
                  </span>
                </div>
              ) : (
                <>
                  <div className="journeyinfo-body-progress-numbers-item">
                    <span className="journeyinfo-body-progress-numbers">
                      {statistic[id]?.statistic.completedTaskCount !== 0 ? statistic[id]?.statistic.completedTaskCount : 'N/A'}
                    </span>
                    <span className="journeyinfo-body-progress-numbers-text">
                      tasks
                    </span>
                  </div>
                </>
              )}
              {/*  */}
              {dateReturner()}
              {/*  */}
            </div>
          </div>
          <div className={'journeyinfo-body-wrapper-dayweek'}>
            {defaultWeekdays.map((dayItem, index) => {
              if (journey.workDays.includes(index)) {
                return (
                  <div
                    key={uuid()}
                    className={
                      'journeyinfo-body-wrapper-dayweek-day__selected'
                    }>
                    <span
                      className={
                        'journeyinfo-body-wrapper-dayweek-day__selected-text'
                      }>
                      {dayItem}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    className={'journeyinfo-body-wrapper-dayweek-day'}
                    key={uuid()}>
                    <span
                      className={'journeyinfo-body-wrapper-dayweek-day-text'}>
                      {dayItem}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          {journey.sections.length !== 0 ? <Tab data={tabData} /> : <></>}
        </>
      ) : (
        <>
          {statistic[id]?.statistic.maxSpent > 0 ? (
            <JourneyHoursCalculation
              duration={statistic[id]?.statistic.maxSpent}
              maxDaySpent={statistic[id]?.statistic.maxDaySpent}
              minDaySpent={statistic[id]?.statistic.minDaySpent}
              durationDays={statistic[id]?.statistic.durationDays}
            />
          ) : (
            <> </>
          )}
          <div className={'journeyinfo-body-wrapper-dayweek'}>
            {defaultWeekdays.map((dayItem, index) => {
              if (journey.workDays.includes(index)) {
                return (
                  <div
                    key={uuid()}
                    className={
                      'journeyinfo-body-wrapper-dayweek-day__selected'
                    }>
                    <span
                      className={
                        'journeyinfo-body-wrapper-dayweek-day__selected-text'
                      }>
                      {dayItem}
                    </span>
                  </div>
                );
              } else {
                return (
                  <div
                    className={'journeyinfo-body-wrapper-dayweek-day'}
                    key={uuid()}>
                    <span
                      className={'journeyinfo-body-wrapper-dayweek-day-text'}>
                      {dayItem}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <div>
            {/* <TextComponent data={journey.subTitle} isSubtitle={true} /> */}
            {journey.sections
              .sort((el1, el2) => {
                if (el1.orderNumber < el2.orderNumber) return -1;
                if (el1.orderNumber > el2.orderNumber) return 1;
                return 0;
              })
              .map((section) => (
                <TextComponent data={generateContent(section)} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default JourneyDescription;
