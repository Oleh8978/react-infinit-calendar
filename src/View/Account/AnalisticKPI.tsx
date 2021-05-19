import React from 'react';

interface IProps {}

const AnalisticKPI: React.FC<IProps> = () => {
  return (
    <div className={'kpi-analistic'}>
      <span className={'kpi-analistic-text'}>Analytics powered by</span>
      <span className={'kpi-analistic-text__bold'}>Pro KPI </span>
      <div
        className={'kpi-analistic-btn'}
        onClick={() => {
          window.location.href = 'https://www.prokpi.com/'
          console.log('start');
        }}>
        <span>Learn more</span>
      </div>
    </div>
  );
};

export default AnalisticKPI;
