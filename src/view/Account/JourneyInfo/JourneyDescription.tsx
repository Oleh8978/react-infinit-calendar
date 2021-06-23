import React from 'react';

// components
import JourneyHoursCalculation from './JourneyHoursCalcul';

// dayweeks
import { dayWeeks } from './data';
import moment from 'moment';

interface IProps {
  hashours?: boolean;
  text: string;
  workDays?: number[];
}

const JourneyDescription: React.FC<IProps> = ({ ...props }) => {
  const defaultWeekdays = Array(...(Array(7))).map(function(_, i) {
    return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('ddd');
  });

  return (
    <div className={'journeyinfo-body-wrapper'}>
      <div className={'journeyinfo-body-wrapper-title'}>
        <span className={'journeyinfo-body-wrapper-title-text'}>
          {props.text}
        </span>
      </div>
      {props.hashours ? <JourneyHoursCalculation /> : <> </>}
      <div className={'journeyinfo-body-wrapper-dayweek'}>
        {defaultWeekdays.map((dayItem, index) => {
          if(props.workDays.includes(index)) {
            return (<div
              className={'journeyinfo-body-wrapper-dayweek-day__selected'}>
              <span
                className={'journeyinfo-body-wrapper-dayweek-day__selected-text'}>
                {dayItem}
              </span>
            </div>)
          } else {
            return (
              <div
                className={'journeyinfo-body-wrapper-dayweek-day'}>
              <span
                className={'journeyinfo-body-wrapper-dayweek-day-text'}>
                {dayItem}
              </span>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default JourneyDescription;
