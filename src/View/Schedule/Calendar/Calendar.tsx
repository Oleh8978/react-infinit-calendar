import React, { useEffect, useState, useRef } from 'react';

// customn components
import DayInCalendar from './DayInCalendar';

// images
import calendarImg from '../../../Asset/images/calendar.png';

// date object functionality

import * as dateObject from './utils';

export interface IHeaderDate {
  month: string;
  year: string;
}

export interface ICurrentDate {
  month: number;
  year: number;
}

interface IProps {}

const Calendar: React.FC<IProps> = () => {
  const fieldRef = React.useRef<HTMLInputElement>(null);
  const calendar = [];

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [headerDate, setHeaderDate] = useState<IHeaderDate>({
    month: String(dateObject.getMonthName(new Date().getMonth())),
    year: String(currentYear),
  });

  const [scheduleDivWidth, setShceduleDivWidth] = useState<number>();
  const [calendarRenderedData, setCalendarRenderedData] = useState(calendar);

  const dateAdder = (
    scrolled: number,
    windowWidth: number,
    blockWidth: number,
  ) => {
    if (scrolled === 0) {
      let arr = [];
      if (calendarRenderedData.length !== 0) {
        const date = new Date(calendarRenderedData[0].date);

        date.setDate(date.getDate() - 1);
        arr.push({
          number: date.getDate(),
          date: dateObject.dateCreator(
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
          ),
          name:
            dateObject.days[
              new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
              ).getDay()
            ],
          hasAnyEvents: false,
          isClicked: false,
        });
        setCalendarRenderedData(arr.concat(calendarRenderedData));
        // console.log('calendarRenderedData ', calendarRenderedData);
        arr = [];
      }
    } else if (scrolled + windowWidth === blockWidth) {
      let arr = [];
      if (calendarRenderedData.length !== 0) {
        const date = new Date(
          calendarRenderedData[calendarRenderedData.length - 1].date,
        );

        date.setDate(date.getDate() + 1);
        calendarRenderedData.push({
          number: date.getDate(),
          date: dateObject.dateCreator(
            date.getDate(),
            date.getMonth() + 1,
            date.getFullYear(),
          ),
          name:
            dateObject.days[
              new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
              ).getDay()
            ],
          hasAnyEvents: false,
          isClicked: false,
        });
        setCalendarRenderedData(calendarRenderedData);
        console.log('calendarRenderedData ', calendarRenderedData);
        arr = [];
      }
    }
  };

  useEffect(() => {
    const schedule = document.querySelector('.schedule') as HTMLElement;
    const calendarHolder = document.querySelector(
      '.calendar-days',
    ) as HTMLElement;

    window.addEventListener('resize', () => console.log(schedule.offsetWidth));

    if (schedule !== null && calendarHolder !== null) {
      calendarHolder.addEventListener('scroll', () => {
        dateAdder(
          calendarHolder.scrollLeft,
          schedule.offsetWidth,
          calendarHolder.scrollWidth,
        );
        console.log('scroll left is ', calendarHolder.scrollLeft);
        // console.log(calendarHolder.scrollLeft + schedule.offsetWidth);
        // console.log(calendarHolder.scrollWidth);
      });
    }
    return () => {
      window.removeEventListener('resize', () =>
        setShceduleDivWidth(schedule.offsetWidth),
      );

      calendarHolder.removeEventListener('scroll', () => {
        dateAdder(
          calendarHolder.scrollLeft,
          schedule.offsetWidth,
          calendarHolder.scrollWidth,
        );
        // console.log(calendarHolder.offsetLeft),
      });
    };
  }, [calendarRenderedData]);

  if (calendar.find((item) => item.isSelected === true)) {
    console.log('one day is selected ');
  } else {
    dateObject.monthArr(currentMonth, currentYear, calendar);
  }

  const dates = calendarRenderedData.map((item) => {
    return (
      <DayInCalendar
        date={item.number}
        key={item.date}
        fullDate={item.date}
        dayWeek={item.name}
        hasEvents={item.hasAnyEvents}
        isClicked={item.isClicked}
      />
    );
  });

  return (
    <div className={'calendar'}>
      <div className="calendar-headwraper">
        <img src={calendarImg} className="calendar-img" alt="img" />
        <span className="calendar-mnth">
          {' ' + headerDate.month + ', ' + headerDate.year}
        </span>
      </div>
      <div className="calendar-days" ref={fieldRef}>
        {dates}
      </div>
    </div>
  );
};

export default Calendar;
