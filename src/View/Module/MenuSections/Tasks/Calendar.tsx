import React, { useState, useEffect } from 'react';

// components
import DayInCalendar from 'View/Schedule/Calendar/DayInCalendar';

// date helper functionality
import * as dateObject from 'View/Schedule/Calendar/utils';
import * as helperFunctions from 'View/Module/MenuSections/Tasks/utils';

// interfaces
import { ICalendarData, IDayHaseAnyEvents } from './Models';

interface IProps {
  data: ICalendarData[];
  dateSetter: (date: string) => void;
  setCheckButton: () => void;
  prevDataIds: number[];
  isAllSelected: IDayHaseAnyEvents[];
}

const Calendar: React.FC<IProps> = ({ ...props }) => {
  const transformedDataCalendar = [];

  const [dates, setDates] = useState<ICalendarData[]>(
    props.data.slice().sort((a: any, b: any) => {
      return +new Date(b.time) - +new Date(a.time);
    }),
  );
  const [calendar, setCalendar] = useState<any>(transformedDataCalendar);
  const [selectedDate, setSelectedDate] = useState<Date>(
    dateObject.dateCreator(
      new Date().getDate(),
      new Date().getMonth() + 1,
      new Date().getFullYear(),
    ),
  );

  const moseMover = (ele) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e) => {
      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  };

  const dateSelctedSetter = () => {
    const newData = [...calendar];
    newData.map((item) => {
      if (
        props.isAllSelected[newData.indexOf(item)].hasAnyevents === true &&
        isAnyUncompleted(props.data[newData.indexOf(item)].tasks)
      ) {
        return (item.hasAnyEvents = true);
      } else {
        return (item.hasAnyEvents = false);
      }
    });
    setCalendar(newData);
  };

  useEffect(() => {
    const elementGenral = document.querySelector('.tasks-calendar');
    moseMover(elementGenral);
    dateSelctedSetter();
  }, [props.isAllSelected]);

  const isAnyUncompleted = (arr) => {
    let isFalse = false;
    arr.map((item) => {
      if (
        item.items.find((item) => item.isChecked === false) !== undefined &&
        helperFunctions.isDateInThePast(item.time) === true
      ) {
        isFalse = true;
      } else {
        isFalse = false;
      }
    });
    return isFalse;
  };

  const transformedArr = [];
  if (dates)
    dates.map((item) => {
      transformedArr.push({
        number: new Date(item.time).getDate(),
        date: dateObject.dateCreator(
          new Date(item.time).getDate(),
          new Date(item.time).getMonth() + 1,
          new Date(item.time).getFullYear(),
        ),
        name: dateObject.getDayInWeek(item.time),
        hasAnyEvents: isAnyUncompleted(item.tasks),
        isClicked: false,
      });
    });

  const checker = (elem, arr) => {
    if (arr.indexOf(elem) !== arr.length - 1) {
      if (
        helperFunctions.getDifIndates(
          arr[arr.indexOf(elem)].date,
          arr[arr.indexOf(elem) + 1].date,
        ) > 1
      ) {
        return true;
      } else {
        return false;
      }
    }
    if (arr.indexOf(elem) === arr.length - 1) {
      return false;
    }
  };

  const transformedData = () => {
    const data = transformedArr.reverse();

    data.map((item) => {
      transformedDataCalendar.push({
        number: data[data.indexOf(item)].number,
        date: data[data.indexOf(item)].date,
        name: data[data.indexOf(item)].name,
        hasAnyEvents: data[data.indexOf(item)].hasAnyEvents,
        isClicked: data[data.indexOf(item)].isClicked,
        hasMorethanOnedayAfter: checker(item, data),
      });
    });
  };
  transformedData();

  const selectDate = (date) => {
    const value = calendar.find((item) => {
      return new Date(item.date).toISOString() === new Date(date).toISOString();
    });
    const newData = [...calendar];

    newData.map((item) => {
      return (item.isClicked = false);
    });

    newData[calendar.indexOf(value)].isClicked = true;

    setSelectedDate(newData[calendar.indexOf(value)].date);
    props.dateSetter(newData[calendar.indexOf(value)].date);
    setCalendar(newData);
    props.setCheckButton();
  };

  if (calendar.find((item) => item.isClicked === true)) {
  } else {
    const requiredItem = calendar.find(
      (item) =>
        String(item.date) ===
        String(
          dateObject.dateCreator(
            new Date().getDate(),
            new Date().getMonth() + 1,
            new Date().getFullYear(),
          ),
        ),
    );
    calendar.map((item) => {
      if (
        String(item.date) ===
          String(
            dateObject.dateCreator(
              new Date().getDate(),
              new Date().getMonth() + 1,
              new Date().getFullYear(),
            ),
          ) &&
        requiredItem
      ) {
        calendar[calendar.indexOf(item)].isClicked = true;
      } else if (
        !requiredItem &&
        String(item.date) ===
          String(
            dateObject.dateCreator(
              new Date(helperFunctions.mostClosestDate(props.data)).getDate(),
              new Date(helperFunctions.mostClosestDate(props.data)).getMonth() +
                1,
              new Date(
                helperFunctions.mostClosestDate(props.data),
              ).getFullYear(),
            ),
          )
      ) {
        calendar[calendar.indexOf(item)].isClicked = true;
      }
    });
  }

  return (
    <>
      <div className="tasks-calendar-headerdate">
        {helperFunctions.months[new Date(selectedDate).getMonth()]},{' '}
        {new Date(selectedDate).getFullYear()}
      </div>
      <div className={'tasks-calendar scrollbar__hidden'}>
        <div className="wrapper">
          {calendar.map((item) => {
            const index = calendar.indexOf(item);
            let isLastOne = false;
            if (calendar.indexOf(item) === calendar.length - 1) {
              isLastOne = true;
            }
            return (
              <DayInCalendar
                key={`${item.date}`}
                date={item.number}
                fullDate={item.date}
                dayWeek={item.name}
                hasEvents={item.hasAnyEvents}
                isClicked={item.isClicked}
                selectDate={selectDate}
                isCustom={true}
                index={index}
                isLastOne={isLastOne}
                hasMorethanOnedayAfter={item.hasMorethanOnedayAfter}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Calendar;
