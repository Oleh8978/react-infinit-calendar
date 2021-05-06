import React, { useState, useEffect } from 'react';

// components
import Calendar from './Calendar';
import Current from './Current';
import Uncompleted from './Uncompleted';

// hardcoded data
import { data } from './HardcodedData/data';

// date objects
import * as dateObject from 'View/Schedule/Calendar/utils';

// interfaces
import { ICalendarData } from './Models';

interface IProps {}

const Task: React.FC<IProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dateObject.dateCreator(
      new Date().getDate(),
      new Date().getMonth() + 1,
      new Date().getFullYear(),
    ),
  );

  const [sortedData, setSortedData] = useState<ICalendarData[]>(
    data
      .slice()
      .sort((a: any, b: any) => {
        return +new Date(b.time) - +new Date(a.time);
      })
      .reverse(),
  );
  const [currentData, setCurrentData] = useState<ICalendarData[]>();
  const [prevData, setPrevData] = useState<ICalendarData[]>([]);

  useEffect(() => {
    setCurrentPage(selectedDate);
    prevDataProvider(selectedDate);
  }, [selectedDate]);

  const prevDataProvider = (currentSelectedData) => {
    const item = sortedData.find(
      (item) =>
        new Date(item.time).setHours(0, 0, 0, 0) ===
        new Date(currentSelectedData).setHours(0, 0, 0, 0),
    );
    if (sortedData.indexOf(item) > 0) {
      setPrevData(
        ifAnyUncompleted(sortedData.slice(0, sortedData.indexOf(item))),
      );
    } else if (sortedData.indexOf(item) === 1) {
      setPrevData(ifAnyUncompleted([sortedData[0]]));
    } else if (sortedData.indexOf(item) === 0) {
      setPrevData([]);
    }
  };

  const checkAllDates = (arr: ICalendarData[], item: ICalendarData) => {
    if (arr.find((elem) => elem.time === item.time) !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  const ifAnyUncompleted = (arr: ICalendarData[]) => {
    const updatedData = [];
    arr.map((arrItem) => {
      arrItem.tasks.map((task) => {
        const isChecked = task.items.find((item) => item.isChecked === false);
        if (isChecked && !checkAllDates(updatedData, arrItem)) {
          updatedData.push(arrItem);
        }
      });
    });
    return updatedData.reverse();
  };

  const setCurrentPage = (date) => {
    const arr = [];
    sortedData.map((item) => {
      if (
        String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
        String(new Date(new Date(date).setHours(0, 0, 0)))
      ) {
        arr.push(item);
      }
    });
    setCurrentData(arr);
  };

  const dateSetter = (date) => {
    setSelectedDate(date);
  };
  console.log(prevData)
  return (
    <div className={'tasks'}>
      <Calendar data={data} dateSetter={dateSetter} />
      <div className="tasks-wrapper">
        <Current currentData={currentData} />
        {prevData.length > 0 ? <Uncompleted prevData={prevData} /> : <></>}
      </div>
    </div>
  );
};

export default Task;
