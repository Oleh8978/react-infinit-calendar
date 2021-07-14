import React, { useState } from 'react';
import { TaskDTO } from '@ternala/frasier-types';

// components
import { Task } from './Task';

// utils
import moment from 'moment';
import { timeConvert } from '@app/utils/timeConverter';
import WellDone from '@app/view/Schedule/WellDone/WellDone';

interface IProps {
  tasks: TaskDTO[];
  time: number;
  duration: number;
  toggleTask: (data: {
    id: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => void;
}

const TimeSlot: React.FC<IProps> = ({ time, toggleTask, ...props }) => {
  return (
    <div className={'tasks-current-task'}>
      <div className="tasks-current-task-timetodo">
        <span className="tasks-current-task-timetodo-time">
          {moment.utc(time * 60 * 1000).format('HH:mm A')}
        </span>{' '}
        <span className="tasks-current-task-timetodo-spendtime">
          | {timeConvert(props.duration)}
        </span>
      </div>

      {props.tasks.map((task) => (
        <Task key={`task-${task.id}`} task={task} toggleTask={toggleTask} />
      ))}
    </div>
  );
};

export default TimeSlot;
