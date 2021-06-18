import React from 'react';

// components
import UncompletedListItem from './UncompletedListItem';

// Utils
import { TimeSlotDTO } from '@ternala/frasier-types';

interface IProps {
  date: string;
  timeSlots: TimeSlotDTO[];
  toggleTask: (data: {
    id: number;
    timeSlot: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => void;
}

const UncompletedTask: React.FC<IProps> = ({ timeSlots, date, toggleTask }) => {
  return (
    <>
      <div className={'tasks-uncompleted'}>
        <span className="tasks-uncompleted-headeritem">{date}</span>
        {timeSlots?.map((timeSlot) => {
          return timeSlot?.tasks.map((task) => {
            if (!task?.executions?.length) {
              return (
                <UncompletedListItem
                  key={'uncompleted-task-' + task.id}
                  task={task}
                  toggleTask={(data: {
                    id: number;
                    action: 'create' | 'remove';
                    callback: (state: boolean) => void;
                  }) =>
                    toggleTask({
                      ...data,
                      timeSlot: timeSlot.id,
                    })
                  }
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
