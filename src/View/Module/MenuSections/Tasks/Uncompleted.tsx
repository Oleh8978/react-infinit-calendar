import React from 'react';

// components
import UncompletedTask from './UncompletedTask';

// interfaces
import { IDayWithTimeSlots } from '@ternala/frasier-types';

interface IProps {
  prevData: IDayWithTimeSlots;
  toggleTask: (data: {
    id: number;
    date: string;
    timeSlot: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => void;
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
                  toggleTask={(data: {
                    id;
                    timeSlot;
                    action: 'create' | 'remove';
                    callback: (state: boolean) => void;
                  }) => toggleTask({ ...data, date: day })}
                />
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Uncompleted;
