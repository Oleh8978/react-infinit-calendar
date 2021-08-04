import React from 'react';
import { useSelector } from 'react-redux';
import { TimeSlotDTO } from '@ternala/frasier-types';

// components
import TimeSlot from './TimeSlot';

// interfaces
import { getUserStartTime } from '@app/controller/auth';
import { defaultUserStartTime } from '@app/config/constants';

interface IProps {
  timeSlots: TimeSlotDTO[];
  toggleTask: (data: {
    id: number;
    timeSlot: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => void;
}

const Current: React.FC<IProps> = ({ timeSlots, ...props }) => {
  let userStartTime = useSelector(getUserStartTime) || defaultUserStartTime;
  return (
    <div className={'tasks-current'}>
      {timeSlots.map((timeSlot) => {
        const timeSlotEl = (
          <TimeSlot
            tasks={timeSlot.tasks}
            time={userStartTime}
            duration={timeSlot.duration}
            title={timeSlot.title}
            toggleTask={(data: {
              id: number;
              action: 'create' | 'remove';
              callback: (state: boolean) => void;
            }) => props.toggleTask({ ...data, timeSlot: timeSlot.id })}
          />
        );
        userStartTime += timeSlot.duration;
        return timeSlotEl;
      })}
    </div>
  );
};

export default Current;
