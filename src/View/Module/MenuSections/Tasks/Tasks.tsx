import React, { useState, useEffect } from 'react';

// components
import Calendar from './Calendar';
import Current from './Current';
import Uncompleted from './Uncompleted';

// hardcoded data
import { data } from './HardcodedData/data';

// date objects
import * as dateObject from 'View/Schedule/Calendar/utils';
import * as helperFunctions from './utils';

// interfaces
import { ICalendarData, IDayHaseAnyEvents } from './Models';

interface IProps {}

const Task: React.FC<IProps> = () => {
  const dataChecker = (day: ICalendarData): boolean => {
    if (
      day.tasks
        .map((task) => {
          return (
            task.items.filter((item) => item.isChecked === false).length === 0
          );
        })
        .filter((item) => item === false).length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const isAllDaysHasComEvents = () => {
    const newData = [...sortedData];
    const allDaysEvents = [];
    newData.map((day) => {
      allDaysEvents.push({
        time: dateObject.dateCreator(
          new Date(day.time).getDate(),
          new Date(day.time).getMonth() + 1,
          new Date(day.time).getFullYear(),
        ),
        hasAnyevents: dataChecker(day),
      });
    });
    return allDaysEvents;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(
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
  const [prevDataIds, setPrevDataId] = useState<number[]>([]);
  const [isAllSelected, setISAllSelected] = useState<IDayHaseAnyEvents[]>(
    isAllDaysHasComEvents(),
  );

  useEffect(() => {
    setCurrentPage(selectedDate);
    prevDataProvider(selectedDate);
    setISAllSelected(isAllDaysHasComEvents());
  }, [selectedDate, data, prevDataIds]);

  const setCheckButton = () => {
    const newData = [...sortedData];
    prevDataIds.map((id) => {
      newData.map((item) => {
        item.tasks.map((task) => {
          if (task.items.find((elem) => elem.id === id)) {
            task.items[
              task.items.lastIndexOf(task.items.find((elem) => elem.id === id))
            ].isChecked = true;
          }
        });
      });
    });

    setSortedData(newData);
  };

  const setCheckButtonID = (id: number) => {
    prevDataIds.push(id);
    setPrevDataId(prevDataIds);
  };

  const setCheckButtonCurrent = (id: number) => {
    const newData = [...sortedData];
    newData.map((item) => {
      item.tasks.map((task) => {
        if (task.items.find((elem) => elem.id === id)) {
          task.items[
            task.items.lastIndexOf(task.items.find((elem) => elem.id === id))
          ].isChecked = true;
        }
      });
    });
    prevDataIds.push(id);
    setSortedData(newData);
  };

  const prevDataProvider = (currentSelectedData) => {
    const item = sortedData.find(
      (item) =>
        new Date(item.time).setHours(0, 0, 0, 0) ===
        new Date(currentSelectedData).setHours(0, 0, 0, 0),
    );
    const closesToItem = sortedData.find(
      (item) =>
        new Date(item.time).setHours(0, 0, 0, 0) ===
        new Date(helperFunctions.mostClosestDate(sortedData)).setHours(
          0,
          0,
          0,
          0,
        ),
    );
    if (item !== undefined) {
      if (sortedData.indexOf(item) > 0) {
        setPrevData(
          ifAnyUncompleted(sortedData.slice(0, sortedData.indexOf(item))),
        );
      } else if (sortedData.indexOf(item) === 1) {
        setPrevData(ifAnyUncompleted([sortedData[0]]));
      } else if (sortedData.indexOf(item) === 0) {
        setPrevData([]);
      }
    } else if (item === undefined) {
      if (sortedData.indexOf(closesToItem) > 0) {
        setPrevData(
          ifAnyUncompleted(
            sortedData.slice(0, sortedData.indexOf(closesToItem)),
          ),
        );
      } else if (sortedData.indexOf(closesToItem) === 1) {
        setPrevData(ifAnyUncompleted([sortedData[0]]));
      } else if (sortedData.indexOf(closesToItem) === 0) {
        setPrevData([]);
      }
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
    const requiredElement = sortedData.find(
      (item) =>
        String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
        String(new Date(new Date(date).setHours(0, 0, 0))),
    );
    sortedData.map((item) => {
      if (
        requiredElement !== undefined &&
        String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
          String(new Date(new Date(date).setHours(0, 0, 0)))
      ) {
        arr.push(item);
      } else if (
        requiredElement === undefined &&
        String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
          String(
            new Date(
              new Date(
                dateObject.dateCreator(
                  new Date(
                    helperFunctions.mostClosestDate(sortedData),
                  ).getDate(),
                  new Date(
                    helperFunctions.mostClosestDate(sortedData),
                  ).getMonth() + 1,
                  new Date(
                    helperFunctions.mostClosestDate(sortedData),
                  ).getFullYear(),
                ),
              ).setHours(0, 0, 0),
            ),
          )
      ) {
        arr.push(item);
      }
    });
    setCurrentData(arr);
  };

  const dateSetter = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className={'tasks'}>
      <Calendar
        data={sortedData}
        dateSetter={dateSetter}
        setCheckButton={setCheckButton}
        prevDataIds={prevDataIds}
        isAllSelected={isAllSelected}
      />
      <div className="tasks-wrapper">
        {currentData && (
          <Current
            currentData={currentData}
            setCheckButton={setCheckButtonCurrent}
          />
        )}
        {prevData.length > 0 ? (
          <Uncompleted prevData={prevData} setCheckButton={setCheckButtonID} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Task;
