import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';
import { useDispatch, useSelector } from 'react-redux';
import { TimeSlotDTO } from '@ternala/frasier-types';

// Components
import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';
import DayOff from './DayOff/DayOff';
import Holiday from './Holiday/Holiday';

// Config
import { limitGetScheduleDays } from '../../Config/constants';

// Actions
import { getHolidayDataAction } from '../../Controller/holidays/actions';
import {
  getDaysOffAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '../../Controller/schedule/actions';

// Selectors
import { getHolidays } from '../../Controller/holidays';
import {
  getDaysOff,
  getSchedule,
  getUncompleted,
} from '../../Controller/schedule';

// utils
import { generateArrayOfDates } from '../../Utils/generateArrayOfDates';
import NoTasks from './NoTasks/NoTasks';

// Interfaces
interface IProps extends RouteComponentProps {
  absoluteBlock: string;
}

const Schedule: React.FC<IProps> = ({ ...props }) => {
  const startDate = moment().subtract(limitGetScheduleDays, 'days');
  const endDate = moment().add(limitGetScheduleDays, 'days');
  const daysInSchedule: Moment[] = generateArrayOfDates(startDate, endDate);

  const schedule = useSelector(getSchedule);
  const uncompletedSchedule = useSelector(getUncompleted);
  const daysOff = useSelector(getDaysOff);
  const holidays = useSelector(getHolidays);

  const [selectedDay, setSelectedDay] = useState<Moment>(moment());
  const [timeSlots, setTimeSlots] = useState<TimeSlotDTO[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getScheduleAction.request({
        date: moment().toDate(),
        limit: limitGetScheduleDays,
      }),
    );
    dispatch(
      getUncompletedTimeSlotsAction.request({
        date: moment().toDate(),
      }),
    );
    dispatch(getDaysOffAction.request({}));
    dispatch(getHolidayDataAction.request({}));
  }, []);
  useEffect(() => {
    setTimeSlots(
      schedule[moment(selectedDay).format(timeSlotDateFormat)] || [],
    );
  }, [selectedDay, schedule]);

  const isCurrentDayOff = daysOff.find((day) =>
    moment(selectedDay).isSame(day.date, 'day'),
  );

  const isCurrentHoliday = holidays.find((holiday) =>
    moment(selectedDay).isSame(holiday.date, 'day'),
  );

  return (
    <div className={'schedule'}>
      {/*{isTaskCompleted ? <WellDone /> : <></>} TODO: Need to add notification, when all task is done by this day*/}
      {/*{isCurrentDayOff ? <DayOff dayOff={isCurrentDayOff} /> : <></>}*/}
      {/*{isCurrentHoliday ? <Holiday holiday={isCurrentHoliday} /> : <></>}*/}
      {/*{timeSlots.length === 0 ? <NoTasks /> : <></>}*/}
      <Calendar
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        daysInSchedule={daysInSchedule}
        schedule={schedule}
        uncompletedSchedule={uncompletedSchedule}
        holidays={holidays}
      />
      <TaskList timeSlots={timeSlots} uncompletedDays={uncompletedSchedule} dayOff={isCurrentDayOff} holiday={isCurrentHoliday} />
      {/*{scheduleData(todayTimeSlots)}*/}
    </div>
  );
};

export default Schedule;
