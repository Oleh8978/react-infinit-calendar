import React, { useEffect, useState } from 'react';

//additionla functionality
import * as dateObject from './utils';

interface IProps {
  date: any;
  fullDate: string;
  dayWeek: any;
  hasEvents: any;
  isClicked: any;
  selectDate: (date: any) => void;
}

const DayInCalendar: React.FC<IProps> = ({
  date,
  fullDate,
  dayWeek,
  hasEvents,
  isClicked,
  selectDate,
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
    <div className="calendar-day-wrapper">
      {isToday(fullDate)}
      <div
        className={isClicked ? 'calendar-day selected-card' : 'calendar-day'}
        onClick={() => selectDate(fullDate)}>
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
