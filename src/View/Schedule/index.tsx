import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants'
import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';
import WellDone from './WellDone/WellDone';

//utils
import { useDispatch, useSelector } from 'react-redux';
import {
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '../../Controller/schedule/actions';

// Interfaces
import { limitGetScheduleDays } from '../../Config/constants';
import { TimeSlotDTO } from '@ternala/frasier-types';
import { getSchedule, getUncompleted } from '../../Controller/schedule';
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

  const [selectedDay, setSelectedDay] = useState<Moment>(moment());
  const [timeSlots, setTimeSlots] = useState<TimeSlotDTO[]>([]);
  const dispatch = useDispatch();

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
      <Calendar
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        daysInSchedule={daysInSchedule}
      />
      <TaskList timeSlots={timeSlots} uncompletedDays={uncompletedSchedule} />
      {/*{scheduleData(todayTimeSlots)}*/}
    </div>
  );
};

export default Schedule;
