import React, { useEffect, useState } from 'react';

//additionla functionality
import * as dateObject from './utils';

interface IProps {
  date: any;
  fullDate: any;
  dayWeek: any;
  hasEvents: any;
  isClicked: any;
}

const DayInCalendar: React.FC<IProps> = ({
  date,
  fullDate,
  dayWeek,
  hasEvents,
  isClicked,
}) => {
  const isToday = (itemDate: string) => {
    if (
      itemDate ===
      dateObject.dateCreator(
        new Date().getDate() + 1,
        new Date().getMonth() + 1,
        new Date().getFullYear(),
      )
    ) {
      return <span className="calendar-day-today">Today</span>;
    } else {
      return (
        <span className="calendar-day-today" style={{ height: '26px' }}></span>
      );
    }
  };
  return (
    <div className="calendar-day-wrapper" onClick={() => console.log(fullDate)}>
      {isToday(fullDate)}
      <div
        className={isClicked ? 'calendar-day selected-card' : 'calendar-day'}>
        <div
          className={'calendar-day-dayweek'}
          style={{ color: isClicked ? 'white' : '' }}>
          {dayWeek}
        </div>
        <div
          className={'calendar-day-date'}
          style={{ color: isClicked ? 'white' : '' }}>
          {date}
        </div>
      </div>
      {hasEvents ? <div className={'calendar-day-marked'} /> : <></>}
    </div>
  );
};

export default DayInCalendar;
