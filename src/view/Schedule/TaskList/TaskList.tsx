import React from 'react';
import { useSelector } from 'react-redux';
import {
  TimeSlotDTO,
  IDayWithTimeSlots,
  DayOffDTO,
  HolidayDTO,
} from '@ternala/frasier-types';

// Config
import { defaultUserStartTime, LoaderAction } from '@app/config/constants';

// Components
import NoTasks from '../NoTasks/NoTasks';
import DayOff from '../DayOff/DayOff';
import Holiday from '../Holiday/Holiday';
import Loader from '@app/component/Loader';
import PrevUncompleted from './PrevUncompleted';
import Task from './Task';

// Actions
import { getHolidayLoader } from '@app/controller/holidays';
import { getUserStartTime } from '@app/controller/auth';

// Interfaces
import { ILoader } from '@app/model';

interface IProps {
  timeSlots: TimeSlotDTO[];
  uncompletedDays?: IDayWithTimeSlots;
  dayOff?: DayOffDTO;
  holiday?: HolidayDTO;
  loader?: ILoader[];
}
const TaskList: React.FC<IProps> = ({
  timeSlots,
  uncompletedDays,
  dayOff,
  holiday,
  loader,
}) => {
  let userStartTime = useSelector(getUserStartTime) || defaultUserStartTime;
  const isAnyUncopleted = true;
  const holidayLoader = useSelector(getHolidayLoader).isLoading;

  return (
    <div className={'modules-list'}>
      {timeSlots.length === 0 ? <NoTasks /> : <></>}
      {dayOff ? (
        loader.filter((item) => item.type === LoaderAction.schedule.getDaysOff)
          .length > 0 ? (
          <Loader isAbsolute={true} isSmall={true} />
        ) : (
          <DayOff dayOff={dayOff} />
        )
      ) : (
        <></>
      )}
      {holiday ? (
        holidayLoader ? (
          <Loader isAbsolute={true} isSmall={true} />
        ) : (
          <Holiday holiday={holiday} />
        )
      ) : (
        <></>
      )}
      <div className={'modules-list__completed'}>
        {timeSlots.map((timeSlot) => {
          if (
            timeSlot.tasks.length &&
            timeSlot.module !== null &&
            timeSlot.module !== undefined
          ) {
            const task = (
              <Task
                moduleId={timeSlot.module.id}
                key={'timeSlot-' + timeSlot.id}
                description={
                  timeSlot.module.title +
                  (timeSlot.title ? ' - ' + timeSlot.title : '')
                }
                date={userStartTime}
                time={timeSlot.duration}
                isCompleted={
                  !timeSlot.tasks.filter((task) => !task.executions.length)
                    .length
                }
              />
            );
            userStartTime += timeSlot.duration;
            return task;
          }
          return '';
        })}
      </div>
      {isAnyUncopleted ? (
        loader.filter(
          (item) => item.type === LoaderAction.schedule.getUncompletedTimeSlots,
        ).length > 0 &&
        (!holiday || !dayOff) ? (
          <Loader isSmall={true} />
        ) : (
          <div className={'modules-list__uncompleted'}>
            <h1 className={'modules-list__uncompleted-header'}>
              Previously Uncompleted
            </h1>
            <div className={'modules-list__uncompleted-list'}>
              {uncompletedDays
                ? Object.entries(uncompletedDays).map(([day, timeSlots]) => {
                    return (
                      <PrevUncompleted
                        date={day}
                        timeSlots={timeSlots}
                        key={'uncompletedTimeSlots' + day}
                      />
                    );
                  })
                : ''}
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
