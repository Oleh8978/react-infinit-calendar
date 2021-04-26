import React, { useEffect, useState, useRef } from 'react';

// customn components
import DayInCalendar from './DayInCalendar';

// images
import calendarImg from '../../../Asset/images/calendar.png';

// HOC
import useScrollListener from './customHOC';

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
  const [calendarRenderedData, setCalendarRenderedData] = useState(calendar);

  const moseMover = (ele) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e) => {
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  };

  useEffect(() => {
    const calendarHolder = document.querySelector(
      '.calendar-days',
    ) as HTMLElement;
    moseMover(calendarHolder);
  }, []);

  const dateAdder = () => {
    const calendarHolder = document.querySelector(
      '.calendar-days',
    ) as HTMLElement;
    const schedule = document.querySelector('.schedule') as HTMLElement;

    const scrolled = calendarHolder.scrollLeft;
    const windowWidth = schedule.offsetWidth;
    const blockWidth = schedule.scrollWidth;

    if (scrolled <= windowWidth) {
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
        calendarHolder.scrollTo(blockWidth + 72, 0);
        arr = [];
      }
    }
    if (scrolled > windowWidth) {
      if (calendarRenderedData.length !== 0) {
        const date = new Date(
          calendarRenderedData[calendarRenderedData.length - 1].date,
        );

        let calRendData = [];

        date.setDate(date.getDate() + 1);
        calRendData.push({
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

        setCalendarRenderedData(calendarRenderedData.concat(calRendData));

        calRendData = [];
      }
    }
  };

  useScrollListener(fieldRef, dateAdder, 100);

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
      <div className="calendar-days disable-scrollbars" ref={fieldRef}>
        {dates}
      </div>
    </div>
  );
};

export default Calendar;
