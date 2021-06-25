import React from 'react';

// Utils
import { getMonthNameShort } from '../Calendar/utils';
import { TimeSlotDTO } from '@ternala/frasier-types';
import InternalLink from '@app/routing/Link';

interface ITask {
  date: string;
  description: string;
}

interface IProps {
  date: string;
  timeSlots: TimeSlotDTO[];
}

const PrevUncompleted: React.FC<IProps> = ({ date, timeSlots }) => {
  return (
    <div className={'task-previous'}>
      <div className={'task-previous-date'}>{date}</div>
      {timeSlots.map((timeSlot) => {
        console.log('timeSlots ', timeSlots)
        console.log('timeSlot.module ', timeSlot.module)
        if (timeSlot.module !== null) {
          return (
            <InternalLink
              to={'module-tab'}
              params={{
                id: String(timeSlot.module.id),
                tabName: 'task',
              }}
              className={'task-previous-description'}
              key={'task-previous-description' + timeSlot?.id}>
              <span>
                {timeSlot?.module?.title +
                  (timeSlot?.title ? ' - ' + timeSlot.title : '')}
              </span>
            </InternalLink>
          );
        }
      })}
    </div>
  );
};

export default PrevUncompleted;
