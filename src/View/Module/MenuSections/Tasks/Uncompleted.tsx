import React, { useState, useEffect } from 'react';

// components
import UncompletedTask from './UncompletedTask';

// interfaces
import { IDayWithTimeSlots } from '@ternala/frasier-types';
import PrevUncompleted from '../../../Schedule/TaskList/PrevUncompleted';

interface IProps {
  prevData: IDayWithTimeSlots;
  toggleTask: (id: number, date: string) => void;
}

const Uncompleted: React.FC<IProps> = ({ toggleTask, ...props }) => {
  return (
    <div className={'tasks-uncompleted'}>
      <span className="tasks-uncompleted-header">Previously uncompleted</span>
      <div className="tasks-uncompleted-wrapper">
        {props.prevData
          ? Object.entries(props.prevData).map(([day, timeSlots]) => {
              return (
                <UncompletedTask
                  date={day}
                  timeSlots={timeSlots}
                  toggleTask={(id) => toggleTask(id, day)}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Uncompleted;
