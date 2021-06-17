import React, { useEffect, useState } from 'react';
import { TimeSlotDTO, IDayWithTimeSlots } from '@ternala/frasier-types';
import Task from './Task';
import PrevUncompleted from './PrevUncompleted';

import { useSelector } from 'react-redux';
import { getUserStartTime } from '../../../Controller/auth';
import { defaultUserStartTime } from '../../../Config/constants';

interface IProps {
  timeSlots: TimeSlotDTO[];
  uncompletedDays?: IDayWithTimeSlots;
}

const TaskList: React.FC<IProps> = ({ timeSlots, uncompletedDays }) => {
  let userStartTime = useSelector(getUserStartTime) || defaultUserStartTime;
  const isAnyUncopleted = true;
  return (
    <div className={'modules-list'}>
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
      {isAnyUncopleted ? (
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
