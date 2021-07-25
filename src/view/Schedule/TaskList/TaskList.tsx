import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TimeSlotDTO,
  IDayWithTimeSlots,
  DayOffDTO,
  HolidayDTO,
} from '@ternala/frasier-types';

// config
import {
  defaultUserStartTime,
  limitGetScheduleDays,
  LoaderAction,
} from '@app/config/constants';

// Components
import NoTasks from '../../../component/pages/schedule/NoTasks';
import DayOff from '../DayOff/DayOff';
import Holiday from '../Holiday/Holiday';
import Loader from '@app/component/Loader';
import PrevUncompleted from './PrevUncompleted';
import Task from './Task';

// Actions
import { getHolidayLoader } from '@app/controller/holidays';
import { getUserStartTime } from '@app/controller/auth';

// Interfaces
import { ILoader } from '@app/model';
import NoJourneys from '@app/component/pages/schedule/NoJourneys';
import {
  getDaysOffAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '@app/controller/schedule/actions';
import moment from 'moment';
import { getHolidayDataAction } from '@app/controller/holidays/actions';

interface IProps {
  timeSlots: TimeSlotDTO[];
  uncompletedDays?: IDayWithTimeSlots;
  dayOff?: DayOffDTO;
  notHaveJourneys?: boolean;
  holiday?: HolidayDTO;
  loader?: ILoader[];
}

const TaskList: React.FC<IProps> = ({
  timeSlots,
  uncompletedDays,
  dayOff,
  holiday,
  loader,
  notHaveJourneys,
}) => {
  let userStartTime = useSelector(getUserStartTime) || defaultUserStartTime;
  const holidayLoader = useSelector(getHolidayLoader).isLoading;
  const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(undefined);

  useEffect(() => {
    setIsFirstLoaded(false);
  }, []);

  useEffect(() => {
    if (loader.length === 0 && isFirstLoaded === false) {
      setIsFirstLoaded(true);
    }
  }, [loader]);

  useEffect(() => {
    if (holidayLoader && isFirstLoaded === false) {
      setIsFirstLoaded(true);
    }
  }, [holidayLoader]);

  return (
    <div className={'modules-list'}>
      {notHaveJourneys ? <NoJourneys /> : ''}
      {!notHaveJourneys && timeSlots.length === 0 ? <NoTasks /> : <></>}
      {dayOff ? (
        <>
          {/*{isFirstLoaded ? (*/}
          {/*  Boolean(loader.filter((item) => item.type === LoaderAction.schedule.getDaysOff)*/}
          {/*    .length) && (*/}
          {/*    <Loader isSmall={true} isAbsolute={true} />*/}
          {/*  )*/}
          {/*) : (<></>)}*/}

          <DayOff dayOff={dayOff} />
        </>
      ) : (
        <></>
      )}
      {holiday ? (
        <>
          {/*{isFirstLoaded && holidayLoader ? (*/}
          {/*  <Loader isSmall={true} isAbsolute={true} />*/}
          {/*) : (<></>)}*/}

          <Holiday holiday={holiday} />
        </>
      ) : (
        <></>
      )}
      <div className={'modules-list__completed'}>
        {timeSlots.map((timeSlot) => {
          if (
            timeSlot.tasks.length &&
            timeSlot.module !== null &&
            timeSlot.module !== undefined
          ) {
            const task = (
              <Task
                moduleId={timeSlot.module.id}
                key={'timeSlot-' + timeSlot.id}
                description={
                  timeSlot.module.title +
                  (timeSlot.title ? ' - ' + timeSlot.title : '')
                }
                date={userStartTime}
                time={timeSlot.duration}
                isCompleted={
                  !timeSlot.tasks.filter((task) => !task.executions.length)
                    .length
                }
              />
            );
            userStartTime += timeSlot.duration;
            return task;
          }
          return '';
        })}
      </div>
      {uncompletedDays ? (
        <>
          {/*{isFirstLoaded ? (*/}
          {/*  Boolean(loader.filter((item) => item.type === LoaderAction.schedule.getUncompletedTimeSlots)*/}
          {/*    .length) && (!holiday || !dayOff) && (*/}
          {/*    <Loader isSmall={true} isAbsolute={true} />*/}
          {/*  )*/}
          {/*) : (<></>)}*/}

          <div className={'modules-list__uncompleted'}>
            <h1 className={'modules-list__uncompleted-header'}>
              Previously Uncompleted
            </h1>
            <div className={'modules-list__uncompleted-list'}>
              {uncompletedDays
                ? Object.entries(uncompletedDays)
                    .sort((day1, day2) => {
                      if (day1[0] < day2[0]) return 1;
                      if (day1[0] > day2[0]) return -1;
                      return 0;
                    })
                    .map(([day, timeSlots]) => {
                      return (
                        <PrevUncompleted
                          date={day}
                          timeSlots={timeSlots}
                          key={'uncompletedTimeSlots' + day}
                        />
                      );
                    })
                : ''}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
