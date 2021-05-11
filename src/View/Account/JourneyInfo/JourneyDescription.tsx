import React from 'react';

// dayweeks
import { dayWeeks } from './data';

interface IProps {}

const JourneyDescription: React.FC<IProps> = () => {
  return (
    <div className={'journeyinfo-body-wrapper'}>
      <div className={'journeyinfo-body-wrapper-title'}>
        <span className={'journeyinfo-body-wrapper-title-text'}>
          This is a template for the journey. Routine tasks.
        </span>
      </div>
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
