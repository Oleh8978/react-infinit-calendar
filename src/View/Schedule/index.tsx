import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';

// Components
import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';
import NoTasks from './NoTasks/NoTasks';
import DayOff from './DayOff/DayOff';
import NoJourneys from './NoJourneys/NoJourneys';
import TrialExpired from './TrialExpired/TrialExpired';
import Holiday from './Holiday/Holiday';
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
import { IStore } from '../../Controller/model';
import * as dateObject from './Calendar/utils';
import { HolidayDTO, HolidayGetListRequest } from '@ternala/frasier-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getHolidayDataAction } from '../../Controller/holidays/actions';

interface IProps extends RouteComponentProps {
  absoluteBlock: string;
  storedSearchParams: any;
  getHolidayList: any;
  holidays: any;
}

const Schedule: React.FC<IProps> = ({ absoluteBlock }) => {
  const startDate = moment().subtract(limitGetScheduleDays, 'days');
  const endDate = moment().add(limitGetScheduleDays, 'days');
  const daysInSchedule: Moment[] = generateArrayOfDates(startDate, endDate);
  const [holidays, setHolidays] = useState<HolidayDTO>(undefined);

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
    if (!holidays) {
      loadHolidays();
      setHolidays(props.holidays);
    }

    console.log('holidays ', holidays);
  }, [holidays]);

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

  const loadHolidays = (
    callback?: any,
  ) => {
    dispatch(props.getHolidayList({ callback }));
  };

  const getDayAndRecords = (day: any) => {
    setSelectedDay(String(day));
  };
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

//export default Schedule;
export default connect(
  (state: IStore) => ({
    holidays: state.HolidayReducer.holidayObject.items,
  }),
  {
    getHolidayList: getHolidayDataAction.request,
  },
)(Schedule);
