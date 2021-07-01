import React from 'react';

interface IProps {
  duration?: number;
  maxDaySpent?: number;
  minDaySpent?: number;
  isEndless?: boolean;
}

const JourneyHoursCalculation: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'journeyinfo-body-hours'}>
      <div className={'journeyinfo-body-hours__first'}>
        <span className={'journeyinfo-body-hours__first__top'}>
          {Math.round(props.duration / 60)} hrs / 60 days
        </span>
        <span className={'journeyinfo-body-hours__first__bottom'}>
          duration
        </span>
      </div>
      <div className={'journeyinfo-body-hours__second'}>
        <span className={'journeyinfo-body-hours__second__top'}>
          {props.minDaySpent && props.maxDaySpent ?
          (`${Math.round(props.minDaySpent / 60)} - ${Math.round(props.maxDaySpent / 60)}`) :
            ('')}</span>
        <span className={'journeyinfo-body-hours__second__bottom'}>
          hrs of effort per day
        </span>
      </div>
    </div>
  );
};

export default JourneyHoursCalculation;
