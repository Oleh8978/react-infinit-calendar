import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';

// Components
import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';
import WellDone from './WellDone/WellDone';
import Holiday from './Holiday/Holiday';

//utils
import { useDispatch, useSelector } from 'react-redux';
import {
  getDaysOffAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '../../Controller/schedule/actions';

// Interfaces
import { limitGetScheduleDays } from '../../Config/constants';
import { TimeSlotDTO } from '@ternala/frasier-types';
import { getDaysOff, getSchedule, getUncompleted } from '../../Controller/schedule';
import { generateArrayOfDates } from '../../Utils/generateArrayOfDates';

interface IProps extends RouteComponentProps {
  absoluteBlock: string;
}

const Schedule: React.FC<IProps> = ({ absoluteBlock }) => {
  const startDate = moment().subtract(limitGetScheduleDays, 'days');
  const endDate = moment().add(limitGetScheduleDays, 'days');
  const daysInSchedule: Moment[] = generateArrayOfDates(startDate, endDate);

  const schedule = useSelector(getSchedule);
  const uncompletedSchedule = useSelector(getUncompleted);
  const daysOff = useSelector(getDaysOff);

  const [selectedDay, setSelectedDay] = useState<Moment>(moment());
  const [timeSlots, setTimeSlots] = useState<TimeSlotDTO[]>([]);
  const dispatch = useDispatch();

  const isCurrentDayOff = daysOff.find((day) =>
    moment(selectedDay).isSame(day.date, 'day')
  );

  useEffect(() => {
    dispatch(
      getScheduleAction.request({
        date: selectedDay.toDate(),
        limit: limitGetScheduleDays,
      }),
    );
    dispatch(
      getUncompletedTimeSlotsAction.request({
        date: selectedDay.toDate(),
      }),
    );
    dispatch(getDaysOffAction.request({}));
  }, []);
  useEffect(() => {
    setTimeSlots(schedule[moment(selectedDay).format(timeSlotDateFormat)] || []);
  }, [selectedDay, schedule]);

  // const scheduleData = (data) => {
  //   const element = <TaskList />;
  //   // data.find((item) => {
  //   //   if (
  //   //     String(
  //   //       dateObject.dateCreator(
  //   //         new Date(item.day).getDate(),
  //   //         new Date(item.day).getMonth() + 1,
  //   //         new Date(item.day).getUTCFullYear(),
  //   //       ),
  //   //     ) === String(selectedDay)
  //   //   ) {
  //   //     if (item.hasAnyEvents) {
  //   //       element = <TaskList />;
  //   //     }
  //   //
  //   //     if (item.isHolidays) {
  //   //       element = <Holiday />;
  //   //     }
  //   //
  //   //     if (item.isDayOff) {
  //   //       element = <DayOff />;
  //   //     }
  //   //
  //   //     if (item.isTrialExpired) {
  //   //       element = <TrialExpired />;
  //   //     }
  //   //
  //   //     if (item.haseNoActiveJourneys) {
  //   //       element = <NoJourneys />;
  //   //     }
  //   //   }
  //   // });
  //
  //   return element;
  // };
  const isTaskCompleated = false;
  return (
    <div className={'schedule'}>
      {isTaskCompleated ? <WellDone /> : <></>}
      {isCurrentDayOff ? <Holiday dayOff={isCurrentDayOff}/> : <></>}
      <Calendar
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        daysInSchedule={daysInSchedule}
        schedule={schedule}
        uncompletedSchedule={uncompletedSchedule}
      />
      <TaskList timeSlots={timeSlots} uncompletedDays={uncompletedSchedule} />
      {/*{scheduleData(todayTimeSlots)}*/}
    </div>
  );
};

export default Schedule;
