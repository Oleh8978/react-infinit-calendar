import React, { useEffect, useState } from 'react';

//additionla functionality
import * as dateObject from './utils';

interface IProps {
  date: any;
  fullDate: Date;
  dayWeek: any;
  hasEvents: any;
  isClicked: any;
  selectDate: (date: any) => void;
  isCustom: boolean;
  index?: number;
  isLastOne?: boolean;
  hasMorethanOnedayAfter?: boolean;
}

const DayInCalendar: React.FC<IProps> = ({ ...props }) => {
  const isToday = (itemDate: Date) => {
    if (
      itemDate ===
      dateObject.dateCreator(
        new Date().getDate(),
        new Date().getMonth() + 1,
        new Date().getFullYear(),
      )
    ) {
      return (
        <span
          className="calendar-day-today"
          style={{ textTransform: 'uppercase' }}>
          Today
        </span>
      );
    } else {
      return (
        <span className="calendar-day-today" style={{ height: '26px' }}></span>
      );
    }
  };

  return (
    <>
      {props.isCustom ? (
        <>
          {props.hasMorethanOnedayAfter ? (
            <>
              <div
                className="calendar-day-wrapper"
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                }}>
                {isToday(props.fullDate)}
                <div
                  className={
                    props.isClicked
                      ? 'calendar-day selected-card'
                      : 'calendar-day'
                  }
                  onClick={() => props.selectDate(props.fullDate)}>
                  <div
                    className={'calendar-day-dayweek'}
                    style={{ color: props.isClicked ? 'white' : '' }}>
                    {props.dayWeek}
                  </div>
                  <div
                    className={'calendar-day-date'}
                    style={{ color: props.isClicked ? 'white' : '' }}>
                    {props.date}
                  </div>
                </div>
                {props.hasEvents ? (
                  <div className={'calendar-day-marked'} />
                ) : (
                  <></>
                )}
              </div>
              <div className="calendar-day-divider">
                <div className="calendar-day-dots-first" />
                <div className="calendar-day-dots" />
                <div className="calendar-day-dots" />
              </div>
            </>
          ) : (
            <>
              <div
                className="calendar-day-wrapper"
                style={{ marginRight: props.isLastOne ? '10px' : '0px' }}>
                {isToday(props.fullDate)}
                <div
                  className={
                    props.isClicked
                      ? 'calendar-day selected-card'
                      : 'calendar-day'
                  }
                  onClick={() => props.selectDate(props.fullDate)}>
                  <div
                    className={'calendar-day-dayweek'}
                    style={{ color: props.isClicked ? 'white' : '' }}>
                    {props.dayWeek}
                  </div>
                  <div
                    className={'calendar-day-date'}
                    style={{ color: props.isClicked ? 'white' : '' }}>
                    {props.date}
                  </div>
                </div>
                {props.hasEvents ? (
                  <div className={'calendar-day-marked'} />
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="calendar-day-wrapper">
          {isToday(props.fullDate)}
          <div
            className={
              props.isClicked ? 'calendar-day selected-card' : 'calendar-day'
            }
            onClick={() => props.selectDate(props.fullDate)}>
            <div
              className={'calendar-day-dayweek'}
              style={{ color: props.isClicked ? 'white' : '' }}>
              {props.dayWeek}
            </div>
            <div
              className={'calendar-day-date'}
              style={{ color: props.isClicked ? 'white' : '' }}>
              {props.date}
            </div>
          </div>
          {props.hasEvents ? <div className={'calendar-day-marked'} /> : <></>}
        </div>
      )}
    </>
  );
};

export default DayInCalendar;
