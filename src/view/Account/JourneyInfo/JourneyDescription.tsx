import React from 'react';

// components 
import JourneyHoursCalculation from './JourneyHoursCalcul'

// dayweeks
import { dayWeeks } from './data';

interface IProps {
  hashours?: boolean
  text: string;
}

const JourneyDescription: React.FC<IProps> = ({...props}) => {
  return (
    <div className={'journeyinfo-body-wrapper'}>
      <div className={'journeyinfo-body-wrapper-title'}>
        <span className={'journeyinfo-body-wrapper-title-text'}>
          {props.text}
        </span>
      </div>
      {props.hashours ? <JourneyHoursCalculation /> : <> </>}
      <div className={'journeyinfo-body-wrapper-dayweek'}>
        {dayWeeks.map((item) => {
          return (
            <div
              className={
                item.isSelected
                  ? 'journeyinfo-body-wrapper-dayweek-day'
                  : 'journeyinfo-body-wrapper-dayweek-day__selected'
              }>
              <span
                className={
                  item.isSelected
                    ? 'journeyinfo-body-wrapper-dayweek-day-text'
                    : 'journeyinfo-body-wrapper-dayweek-day__selected-text'
                }>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JourneyDescription;
