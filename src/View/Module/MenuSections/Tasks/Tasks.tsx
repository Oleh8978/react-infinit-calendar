import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';

// Config
import {
  limitGetModuleScheduleDays,
  limitGetScheduleDays,
} from '../../../../Config/constants';

// components
import Calendar from './Calendar';
import Current from './Current';
import Uncompleted from './Uncompleted';

// interfaces
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleExecuteTaskAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '../../../../Controller/module/actions';
import { generateArrayOfDates } from '../../../../Utils/generateArrayOfDates';
import { getModules } from '../../../../Controller/module';
import { ModuleExpandDTO } from '../../../../Controller/module/models';
import { TimeSlotDTO } from '@ternala/frasier-types';

interface IProps {
  tabName?: string;
  id: number;
}

const Task: React.FC<IProps> = ({ id }) => {
  const startDate = moment().subtract(limitGetScheduleDays, 'days');
  const endDate = moment().add(limitGetScheduleDays, 'days');
  const daysInSchedule: Moment[] = generateArrayOfDates(startDate, endDate);
  const [timeSlots, setTimeSlots] = useState<TimeSlotDTO[]>([]);
  const [days, setDays] = useState<Moment[]>([]);

  const [selectedDay, setSelectedDay] = useState<Moment | undefined>();

  const [module, setModule] = useState<ModuleExpandDTO | undefined>();
  const now = moment();

  const modules = useSelector(getModules);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeSlots(
      module?.timeSlotData?.[selectedDay?.format(timeSlotDateFormat)] || [],
    );
  }, [selectedDay, module]);

  useEffect(() => {
    setModule(modules[id]);
    if (module?.timeSlotData) {
      const calendarDays = daysInSchedule.filter((day) => {
        return !!module?.timeSlotData?.[day.format(timeSlotDateFormat)];
      });
      setDays(calendarDays);

      let purposeDate: Moment;
      calendarDays.forEach((calendarDay) => {
        if (
          calendarDay.isSameOrBefore(now) &&
          (purposeDate ? calendarDay.isSameOrAfter(purposeDate) : true)
        ) {
          purposeDate = calendarDay;
        }
      });
      if (!purposeDate) {
        calendarDays.forEach((calendarDay) => {
          if (
            calendarDay.isSameOrAfter(now) &&
            (purposeDate ? calendarDay.isSameOrBefore(purposeDate) : true)
          ) {
            purposeDate = calendarDay;
          }
        });
      }
      if (!purposeDate) {
        purposeDate = now;
      }
      setSelectedDay(purposeDate);
    }
  }, [modules, id, module?.timeSlotData]);

  useEffect(() => {
    dispatch(
      getScheduleAction.request({
        date: now.toDate(),
        limit: limitGetModuleScheduleDays,
        module: id,
      }),
    );
    dispatch(
      getUncompletedTimeSlotsAction.request({
        date: now.toDate(),
        limit: limitGetModuleScheduleDays,
        module: id,
      }),
    );
  }, [id]);

  // const dataChecker = (day: ICalendarData): boolean => {
  //   return day.tasks
  //     .map((task) => {
  //       return (
  //         task.items.filter((item) => item.isChecked === false).length === 0
  //       );
  //     })
  //     .filter((item) => item === false).length !== 0;
  // };
  //
  // const isAllDaysHasComEvents = () => {
  //   const newData = [...sortedData];
  //   const allDaysEvents = [];
  //   newData.map((day) => {
  //     allDaysEvents.push({
  //       time: dateObject.dateCreator(
  //         new Date(day.time).getDate(),
  //         new Date(day.time).getMonth() + 1,
  //         new Date(day.time).getFullYear(),
  //       ),
  //       hasAnyevents: dataChecker(day),
  //     });
  //   });
  //   return allDaysEvents;
  // };
  //
  // const [selectedDate, setSelectedDate] = useState<any>(
  //   dateObject.dateCreator(
  //     new Date().getDate(),
  //     new Date().getMonth() + 1,
  //     new Date().getFullYear(),
  //   ),
  // );
  //
  // const [sortedData, setSortedData] = useState<ICalendarData[]>(
  //   data
  //     .slice()
  //     .sort((a: any, b: any) => {
  //       return +new Date(b.time) - +new Date(a.time);
  //     })
  //     .reverse(),
  // );
  //
  // const [currentData, setCurrentData] = useState<ICalendarData[]>();
  // const [prevData, setPrevData] = useState<ICalendarData[]>([]);
  // const [prevDataIds, setPrevDataId] = useState<number[]>([]);
  // const [isAllSelected, setISAllSelected] = useState<IDayHaseAnyEvents[]>(
  //   isAllDaysHasComEvents(),
  // );
  //
  // useEffect(() => {
  //   setCurrentPage(selectedDate);
  //   prevDataProvider(selectedDate);
  //   setISAllSelected(isAllDaysHasComEvents());
  // }, [selectedDate, data, prevDataIds]);
  //
  // const setCheckButton = () => {
  //   const newData = [...sortedData];
  //   prevDataIds.map((id) => {
  //     newData.map((item) => {
  //       item.tasks.map((task) => {
  //         if (task.items.find((elem) => elem.id === id)) {
  //           task.items[
  //             task.items.lastIndexOf(task.items.find((elem) => elem.id === id))
  //           ].isChecked = true;
  //         }
  //       });
  //     });
  //   });
  //
  //   setSortedData(newData);
  // };
  //
  // const setCheckButtonID = (id: number) => {
  //   prevDataIds.push(id);
  //   setPrevDataId(prevDataIds);
  // };
  //
  // const setCheckButtonCurrent = (id: number) => {
  //   const newData = [...sortedData];
  //   newData.map((item) => {
  //     item.tasks.map((task) => {
  //       if (task.items.find((elem) => elem.id === id)) {
  //         task.items[
  //           task.items.lastIndexOf(task.items.find((elem) => elem.id === id))
  //         ].isChecked = true;
  //       }
  //     });
  //   });
  //   prevDataIds.push(id);
  //   setSortedData(newData);
  // };
  //
  // const prevDataProvider = (currentSelectedData) => {
  //   const item = sortedData.find(
  //     (item) =>
  //       new Date(item.time).setHours(0, 0, 0, 0) ===
  //       new Date(currentSelectedData).setHours(0, 0, 0, 0),
  //   );
  //   const closesToItem = sortedData.find(
  //     (item) =>
  //       new Date(item.time).setHours(0, 0, 0, 0) ===
  //       new Date(helperFunctions.mostClosestDate(sortedData)).setHours(
  //         0,
  //         0,
  //         0,
  //         0,
  //       ),
  //   );
  //   if (item !== undefined) {
  //     if (sortedData.indexOf(item) > 0) {
  //       setPrevData(
  //         ifAnyUncompleted(sortedData.slice(0, sortedData.indexOf(item))),
  //       );
  //     } else if (sortedData.indexOf(item) === 1) {
  //       setPrevData(ifAnyUncompleted([sortedData[0]]));
  //     } else if (sortedData.indexOf(item) === 0) {
  //       setPrevData([]);
  //     }
  //   } else if (item === undefined) {
  //     if (sortedData.indexOf(closesToItem) > 0) {
  //       setPrevData(
  //         ifAnyUncompleted(
  //           sortedData.slice(0, sortedData.indexOf(closesToItem)),
  //         ),
  //       );
  //     } else if (sortedData.indexOf(closesToItem) === 1) {
  //       setPrevData(ifAnyUncompleted([sortedData[0]]));
  //     } else if (sortedData.indexOf(closesToItem) === 0) {
  //       setPrevData([]);
  //     }
  //   }
  // };
  //
  // const checkAllDates = (arr: ICalendarData[], item: ICalendarData) => {
  //   if (arr.find((elem) => elem.time === item.time) !== undefined) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  //
  // const ifAnyUncompleted = (arr: ICalendarData[]) => {
  //   const updatedData = [];
  //   arr.map((arrItem) => {
  //     arrItem.tasks.map((task) => {
  //       const isChecked = task.items.find((item) => item.isChecked === false);
  //       if (isChecked && !checkAllDates(updatedData, arrItem)) {
  //         updatedData.push(arrItem);
  //       }
  //     });
  //   });
  //   return updatedData.reverse();
  // };
  //
  // const setCurrentPage = (date) => {
  //   const arr = [];
  //   const requiredElement = sortedData.find(
  //     (item) =>
  //       String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
  //       String(new Date(new Date(date).setHours(0, 0, 0))),
  //   );
  //   sortedData.map((item) => {
  //     if (
  //       requiredElement !== undefined &&
  //       String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
  //         String(new Date(new Date(date).setHours(0, 0, 0)))
  //     ) {
  //       arr.push(item);
  //     } else if (
  //       requiredElement === undefined &&
  //       String(new Date(new Date(item.time).setHours(0, 0, 0))) ===
  //         String(
  //           new Date(
  //             new Date(
  //               dateObject.dateCreator(
  //                 new Date(
  //                   helperFunctions.mostClosestDate(sortedData),
  //                 ).getDate(),
  //                 new Date(
  //                   helperFunctions.mostClosestDate(sortedData),
  //                 ).getMonth() + 1,
  //                 new Date(
  //                   helperFunctions.mostClosestDate(sortedData),
  //                 ).getFullYear(),
  //               ),
  //             ).setHours(0, 0, 0),
  //           ),
  //         )
  //     ) {
  //       arr.push(item);
  //     }
  //   });
  //   setCurrentData(arr);
  // };
  //
  // const dateSetter = (date) => {
  //   setSelectedDate(date);
  // };

  const toggleTask = ({id, date, timeSlot, action}: {id: number, date: string, timeSlot: number, action: "create" | "remove"}) => {
    dispatch(
      toggleExecuteTaskAction.request({
        action,
        task: id,
        purposeDate: moment(date, timeSlotDateFormat).toDate(),
        timeSlot,
        module: module?.id,
      }),
    );
  };

  return (
    <div className={'tasks'}>
      <Calendar
        days={days}
        selectDay={setSelectedDay}
        selectedDay={selectedDay}
        uncompletedSchedule={module?.uncompletedTimeSlotData}
      />
      <div className="tasks-wrapper">
        {timeSlots && (
          <Current
            timeSlots={timeSlots}
            toggleTask={(id: number, timeSlot: number, action: "create" | "remove") =>
              toggleTask({id, timeSlot, date: selectedDay.format(timeSlotDateFormat), action})
            }
          />
        )}
        {module?.uncompletedTimeSlotData &&
        Object.keys(module?.uncompletedTimeSlotData).length > 0 ? (
          <Uncompleted
            prevData={module?.uncompletedTimeSlotData}
            toggleTask={toggleTask}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Task;
