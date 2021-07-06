import React from 'react';
import moment, { Moment } from 'moment';

// components
import UncompletedTask from './UncompletedTask';

// interfaces
import { IDayWithTimeSlots } from '@ternala/frasier-types';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';

interface IProps {
  prevData: IDayWithTimeSlots;
  toggleTask: (data: {
    id: number;
    date: Moment;
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
          ? Object.entries(props.prevData)
              .sort((day1, day2) => {
                if (day1[0] < day2[0]) return 1;
                if (day1[0] > day2[0]) return -1;
                return 0;
              })
              .map(([day, timeSlots]) =>
                timeSlots?.length ? (
                  <UncompletedTask
                    key={'tasks-uncompleted' + day}
                    date={day}
                    timeSlots={timeSlots}
                    toggleTask={(data: {
                      id;
                      timeSlot;
                      action: 'create' | 'remove';
                      callback: (state: boolean) => void;
                    }) => {
                      toggleTask({
                        ...data,
                        date: moment.utc(day, timeSlotDateFormat),
                      });
                    }}
                  />
                ) : (
                  <></>
                ),
              )
          : ''}
      </div>
    </div>
  );
};

export default Uncompleted;
