import React from 'react';

// components
import JourneyHoursCalculation from './JourneyHoursCalcul';

// dayweeks
import moment from 'moment';
import TextComponent from '@app/view/Account/JourneyInfo/JourneyTextComponents';

interface IProps {
  hashours?: boolean;
  text: string;
  workDays?: number[];
  duration?: number;
  maxDaySpent?: number;
  minDaySpent?: number;
  isEndless?: boolean;
  data?: string;
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
      {props.hashours ? <JourneyHoursCalculation
        duration={props.duration}
        maxDaySpent={props.maxDaySpent}
        minDaySpent={props.minDaySpent}
      /> : <> </>}
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
      <TextComponent
        data={props.data}
      />
    </div>
  );
};

export default JourneyDescription;
