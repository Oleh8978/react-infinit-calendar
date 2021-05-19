import React from 'react';

interface IProps {}

const JourneyHoursCalculation: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'journeyinfo-body-hours'}>
      <div className={'journeyinfo-body-hours__first'}>
        <span className={'journeyinfo-body-hours__first__top'}>
          110 hrs / 24 days
        </span>
        <span className={'journeyinfo-body-hours__first__bottom'}>
          duration
        </span>
      </div>
      <div className={'journeyinfo-body-hours__second'}>
        <span className={'journeyinfo-body-hours__second__top'}>2–4</span>
        <span className={'journeyinfo-body-hours__second__bottom'}>
          hrs of effort per day
        </span>
      </div>
    </div>
  );
};

export default JourneyHoursCalculation;
