import React, { useEffect, useState } from 'react';
import { TimeSlotDTO, IDayWithTimeSlots, DayOffDTO } from '@ternala/frasier-types';
import { useSelector } from 'react-redux';
import { HolidayDTO } from '@ternala/frasier-types/lib/modules/holiday/holiday.dto';
import Task from './Task';
import PrevUncompleted from './PrevUncompleted';

import { getUserStartTime } from '@app/controller/auth';
import { defaultUserStartTime, LoaderAction } from '@app/config/constants';
import NoTasks from '../NoTasks/NoTasks';
import DayOff from '../DayOff/DayOff';
import Holiday from '../Holiday/Holiday';
import { ILoader } from '@app/model';
import Loader from '@app/component/Loader';
import { getHolidayLoader } from '@app/controller/holidays';

interface IProps {
  timeSlots: TimeSlotDTO[];
  uncompletedDays?: IDayWithTimeSlots;
  dayOff?: DayOffDTO;
  holiday?: HolidayDTO;
  loader?: ILoader[];
}
const TaskList: React.FC<IProps> = ({ timeSlots, uncompletedDays, dayOff, holiday, loader }) => {
  let userStartTime = useSelector(getUserStartTime) || defaultUserStartTime;
  const isAnyUncopleted = true;
  const holidayLoader = useSelector(getHolidayLoader).isLoading;

  return (
    <div className={'modules-list'}>
      {timeSlots.length === 0 ? <NoTasks /> : <></>}
      {dayOff ? (loader.filter(item => item.type === LoaderAction.schedule.getDaysOff).length > 0 ?
        <Loader isAbsolute={true} isSmall={true} /> : <DayOff dayOff={dayOff} />) : <></>}
      {holiday ? (holidayLoader ? <Loader isAbsolute={true} isSmall={true} /> : <Holiday holiday={holiday} />) : <></>}
      <div className={'modules-list__completed'}>
        {timeSlots.map((timeSlot) => {
          if (timeSlot.tasks.length) {
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
      {isAnyUncopleted ? ((loader.filter(item => item.type === LoaderAction.schedule.getUncompletedTimeSlots).length > 0 && (!holiday || !dayOff)) ?
        (<Loader isSmall={true} />) : (
        <div className={'modules-list__uncompleted'}>
          <h1 className={'modules-list__uncompleted-header'}>
            Previously Uncompleted
          </h1>
          <div className={'modules-list__uncompleted-list'}>
            {uncompletedDays
              ? Object.entries(uncompletedDays).map(([day, timeSlots]) => {
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
      )) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
