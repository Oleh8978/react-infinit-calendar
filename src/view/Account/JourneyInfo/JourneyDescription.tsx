import React from 'react';

// components
import JourneyHoursCalculation from './JourneyHoursCalcul';
import Tab from '@app/component/Tab';
import TextComponent from '@app/view/Account/JourneyInfo/JourneyTextComponents';

// dayweeks
import moment from 'moment';

// types
import {
  JourneyGetResponse,
  StatisticGetJourneyResponse,
} from '@ternala/frasier-types';
import JourneyStatisticTable from '@app/view/Journey/JourneyStatisticTable';

interface IProps {
  journey: JourneyGetResponse;
  statistic: StatisticGetJourneyResponse;
  isTrialStarted: boolean;
  hashours?: boolean;
  isEndless?: boolean;
}

const JourneyDescription: React.FC<IProps> = ({
  journey,
  statistic,
  hashours,
  isTrialStarted,
}) => {
  const defaultWeekdays = Array(...Array(7)).map(function (_, i) {
    return moment(i, 'e')
      .startOf('week')
      .isoWeekday(i + 1)
      .format('ddd');
  });

  const tabData = [
    {
      id: '1',
      tabTitle: 'Statistics',
      tabContent: <JourneyStatisticTable data={statistic.modules} />,
    },
    {
      id: '2',
      tabTitle: 'Description',
      tabContent: <TextComponent data={journey.subTitle} />,
    },
  ];

  return (
    <div className={'journeyinfo-body-wrapper'}>
      <div className={'journeyinfo-body-wrapper-title'}>
        <span className={'journeyinfo-body-wrapper-title-text'}>
          {journey.title}
        </span>
      </div>
      {isTrialStarted ? (
        <>
          <div className="journeyinfo-body-progress">
            <div className="journeyinfo-body-progress-line"/>
            <div className="journeyinfo-body-progress-numbers-wrap">
              <div className="journeyinfo-body-progress-numbers-item">
                <span className="journeyinfo-body-progress-numbers">
                  {statistic.journey.statistic.spent}
                </span>
                <span className="journeyinfo-body-progress-numbers">
                  &nbsp;/ {statistic.journey.statistic.maxSpent}
                </span>
                <span className="journeyinfo-body-progress-numbers-text">
                  hrs spent
                </span>
              </div>
              <div className="journeyinfo-body-progress-numbers-item">
                <span className="journeyinfo-body-progress-numbers">
                  {statistic.journey.statistic.completedTaskCount}
                </span>
                <span className="journeyinfo-body-progress-numbers">
                  &nbsp;/ {statistic.journey.statistic.maxTaskCount}
                </span>
                <span className="journeyinfo-body-progress-numbers-text">
                  tasks
                </span>
              </div>
              <div className="journeyinfo-body-progress-numbers-item">
                <span className="journeyinfo-body-progress-numbers">
                  {journey.status
                    ? moment(journey.status.trialEndDate).format('MM/DD/YY')
                    : 'Endless'}
                </span>
                <span className="journeyinfo-body-progress-numbers-text">
                  {journey.status ? 'ends' : 'duration'}
                </span>
              </div>
            </div>
          </div>
          <div className={'journeyinfo-body-wrapper-dayweek'}>
            {defaultWeekdays.map((dayItem, index) => {
              if (journey.workDays.includes(index)) {
                return (
                  <div
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
                  <div className={'journeyinfo-body-wrapper-dayweek-day'}>
                    <span
                      className={'journeyinfo-body-wrapper-dayweek-day-text'}>
                      {dayItem}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <Tab data={tabData} />
        </>
      ) : (
        <>
          {hashours ? (
            <JourneyHoursCalculation
              duration={statistic.journey.statistic.maxSpent}
              maxDaySpent={statistic.journey.statistic.maxDaySpent}
              minDaySpent={statistic.journey.statistic.minDaySpent}
            />
          ) : (
            <> </>
          )}
          <div className={'journeyinfo-body-wrapper-dayweek'}>
            {defaultWeekdays.map((dayItem, index) => {
              if (journey.workDays.includes(index)) {
                return (
                  <div
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
                  <div className={'journeyinfo-body-wrapper-dayweek-day'}>
                    <span
                      className={'journeyinfo-body-wrapper-dayweek-day-text'}>
                      {dayItem}
                    </span>
                  </div>
                );
              }
            })}
          </div>
          <TextComponent data={journey.subTitle} />
        </>
      )}
    </div>
  );
};

export default JourneyDescription;
