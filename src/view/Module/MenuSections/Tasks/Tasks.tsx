import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';
import { useDispatch, useSelector } from 'react-redux';
import { omit } from 'lodash';

// config
import {
  limitGetModuleScheduleDays,
  limitGetScheduleDays,
  LoaderAction,
} from '@app/config/constants';

// components
import Calendar from './Calendar';
import Current from './Current';
import Uncompleted from './Uncompleted';

// interfaces
import {
  toggleExecuteTaskAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '@app/controller/module/actions';
import { generateArrayOfDates } from '@app/utils/generateArrayOfDates';
import { getLoader, getModules } from '@app/controller/module';
import { ModuleExpandDTO } from '@app/controller/module/models';
import { IDayWithTimeSlots, TimeSlotDTO } from '@ternala/frasier-types';
import Loader from '@app/component/Loader';
import NoTasks from '@app/component/pages/schedule/NoTasks';
import WellDone from '@app/view/Schedule/WellDone/WellDone';

interface IProps {
  tabName?: string;
  id: number;
}

interface IPrev {
  timeSlots: TimeSlotDTO[];
  selectedDay: Moment;
}

const Task: React.FC<IProps> = ({ id }) => {
  const startDate = moment().subtract(limitGetScheduleDays, 'days');
  const endDate = moment().add(limitGetScheduleDays, 'days');
  const daysInSchedule: Moment[] = generateArrayOfDates(startDate, endDate);
  const [timeSlots, setTimeSlots] = useState<TimeSlotDTO[]>([]);
  const [uncompleted, setUncompleted] = useState<IDayWithTimeSlots>();
  const [days, setDays] = useState<Moment[]>([]);
  const [selectedDay, setSelectedDay] = useState<Moment | undefined>();
  const [isCompletedForToday, setIsCompletedForToday] =
    useState<boolean>(false);
  const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(undefined);

  const [module, setModule] = useState<ModuleExpandDTO | undefined>();
  const now = moment();

  const modules = useSelector(getModules);
  const loaders = useSelector(getLoader);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsFirstLoaded(false);
    setIsCompletedForToday(false);
  }, []);

  useEffect(() => {
    if (loaders.length === 0 && isFirstLoaded === false) {
      setIsFirstLoaded(true);
    }
  }, [loaders]);

  useEffect(() => {
    if (selectedDay !== undefined && module !== undefined)
      setTimeSlots(
        module?.timeSlotData?.[selectedDay?.format(timeSlotDateFormat)] || [],
      );
  }, [selectedDay, module, module?.timeSlotData]);

  useEffect(() => {
    if (isCompletedForToday)
      setTimeout(() => {
        setIsCompletedForToday(false);
      }, 2000);
  }, [isCompletedForToday]);

  useEffect(() => {
    if (module?.uncompletedTimeSlotData) {
      setUncompleted(Object.assign({}, module?.uncompletedTimeSlotData));
    }
  }, [selectedDay]);

  useEffect(() => {
    if (!uncompleted || (uncompleted && !Object.keys(uncompleted).length)) {
      setUncompleted(Object.assign({}, module?.uncompletedTimeSlotData));
    }
  }, [selectedDay, module, module?.uncompletedTimeSlotData]);

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
      if (!selectedDay) {
        setSelectedDay(purposeDate);
      }
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

  const toggleTask = ({
    id,
    date,
    timeSlot,
    action,
    callback,
  }: {
    id: number;
    date: Moment;
    timeSlot: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => {
    dispatch(
      toggleExecuteTaskAction.request({
        action,
        task: id,
        purposeDate: date.toDate(),
        timeSlot,
        module: module?.id,
        callback,
      }),
    );

    const res = timeSlots.every((timeSlot) => {
      return timeSlot.tasks.every((task) => {
        return (
          (task.executions.length > 0 && task.id !== id) ||
          (task.id === id && task.executions.length === 0)
        );
      });
    });

    setIsCompletedForToday(res);
  };

  const toggleUncompletedTask = ({
    id,
    date,
    timeSlot,
    action,
    callback,
  }: {
    id: number;
    date: Moment;
    timeSlot: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => {
    dispatch(
      toggleExecuteTaskAction.request({
        action,
        task: id,
        purposeDate: date.toDate(),
        timeSlot,
        module: module?.id,
        callback,
      }),
    );
  };

  const uncompletedWithoutSelectedDay: IDayWithTimeSlots = omit(uncompleted, [
    moment(selectedDay).format(timeSlotDateFormat),
  ]);
  const hasUncompleted = Boolean(
    uncompletedWithoutSelectedDay &&
      Object.values(uncompletedWithoutSelectedDay).reduce(
        (acc, day) =>
          acc +
          (day
            ? day.reduce(
                (acc, timeSlot) =>
                  acc +
                  (timeSlot
                    ? timeSlot.tasks.reduce(
                        (acc, task) =>
                          acc + (task ? (task.executions?.length ? 0 : 1) : 0),
                        0,
                      )
                    : 0),
                0,
              )
            : 0),
        0,
      ),
  );
  return (
    <>{module !== undefined ?
    <div className={'tasks'}>
      {isCompletedForToday ? <WellDone /> : <></>}
      <Calendar
        days={days}
        selectDay={setSelectedDay}
        selectedDay={selectedDay}
        uncompletedSchedule={uncompleted}
      />
      <div className="tasks-wrapper">
        {isFirstLoaded ? (
          Boolean(
            loaders.filter(
              (item) => item.type === LoaderAction.module.getSchedule,
            ).length,
          ) && <Loader isSmall={true} isAbsolute={true} />
        ) : (
          <></>
        )}

        {module !== undefined && timeSlots.length !== 0? (
          <Current
            timeSlots={timeSlots}
            toggleTask={(data: {
              id: number;
              timeSlot: number;
              action: 'create' | 'remove';
              callback: (state: boolean) => void;
            }) => {
              toggleTask({
                ...data,
                date: selectedDay,
              });
            }}
          />
        ) : (
          <>
            {module !== undefined && Object.keys(modules).length === 0  ? <NoTasks /> : <></>}
          </>
        )}

        {hasUncompleted ? (
          <Uncompleted
            prevData={uncompletedWithoutSelectedDay}
            toggleTask={toggleUncompletedTask}
          />
        ) : (
          <></>
        )}
      </div>
    </div> : <Loader/>}
    </>
  );
};

export default Task;
