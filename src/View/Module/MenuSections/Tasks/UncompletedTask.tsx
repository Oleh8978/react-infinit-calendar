import React from 'react';

// components
import UncompletedListItem from './UncompletedListItem';

// utils
import { TimeSlotDTO } from '@ternala/frasier-types';

interface IProps {
  date: string;
  timeSlots: TimeSlotDTO[];
  toggleTask: (id: number, timeSlot: number, action: 'create' | 'remove') => void;
}

const UncompletedTask: React.FC<IProps> = ({ timeSlots, date, toggleTask }) => {
  return (
    <>
      <div className={'tasks-uncompleted'}>
        <span className="tasks-uncompleted-headeritem">
          {date}
        </span>
        {timeSlots?.map((timeSlot) => {
          return timeSlot?.tasks.map((task) => {
            if (!task?.executions?.length) {
              return (
                <UncompletedListItem
                  task={task}
                  toggleTask={(id: number, action: 'create' | 'remove') => toggleTask(id, timeSlot.id, action)}
                />
              );
            }
          });
        })}
      </div>
    </>
  );
};

export default UncompletedTask;
