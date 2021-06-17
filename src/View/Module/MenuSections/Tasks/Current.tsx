import React from 'react';
import { useSelector } from 'react-redux';
import { TimeSlotDTO } from '@ternala/frasier-types';

// components
import TimeSlot from './TimeSlot';

// interfaces
import { getUserStartTime } from '../../../../Controller/auth';
import { defaultUserStartTime } from '../../../../Config/constants';

interface IProps {
  timeSlots: TimeSlotDTO[];
  toggleTask: (id: number, timeSlot: number, action: "create" | "remove") => void;
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
            toggleTask={(id: number, action: 'create' | 'remove') =>
              props.toggleTask(id, timeSlot.id, action)
            }
          />
        );
        userStartTime += timeSlot.duration;
        return timeSlotEl;
      })}
    </div>
  );
};

export default Current;
