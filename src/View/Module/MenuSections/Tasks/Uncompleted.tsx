import React, { useState, useEffect } from 'react';

// components
import UncompletedTask from './UncompletedTask';

// interfaces
import { IDayWithTimeSlots } from '@ternala/frasier-types';
import PrevUncompleted from '../../../Schedule/TaskList/PrevUncompleted';

interface IProps {
  prevData: IDayWithTimeSlots;
  toggleTask: (data: {id: number, date: string, timeSlot: number, action: 'create' | 'remove'}) => void;
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
                  toggleTask={(id, timeSlot, action: 'create' | 'remove') => toggleTask({id, date: day, timeSlot, action})}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Uncompleted;
