import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { journeyExceptionsEnum, timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';
import { useDispatch, useSelector } from 'react-redux';
import { IDayWithTimeSlots, TimeSlotDTO } from '@ternala/frasier-types';
import { omit } from 'lodash';

// Components
import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';

// config
import { limitGetScheduleDays, LoaderAction } from '@app/config/constants';

// Actions
import { getHolidayDataAction } from '@app/controller/holidays/actions';
import {
  getDaysOffAction,
  getScheduleAction,
  getUncompletedTimeSlotsAction,
} from '@app/controller/schedule/actions';

// Selectors
import { getHolidays } from '@app/controller/holidays';
import {
  getDaysOff, getExceptions,
  getLoader,
  getSchedule,
  getUncompleted,
} from '@app/controller/schedule';

// utils
import { generateArrayOfDates } from '@app/utils/generateArrayOfDates';
import Loader from '@app/component/Loader';

// Interfaces
interface IProps extends RouteComponentProps {
  absoluteBlock: string;
}

const Schedule: React.FC<IProps> = () => {
  const startDate = moment().subtract(limitGetScheduleDays, 'days');
  const endDate = moment().add(limitGetScheduleDays, 'days');
  const daysInSchedule: Moment[] = generateArrayOfDates(startDate, endDate);

  const schedule = useSelector(getSchedule);
  const uncompletedSchedule = useSelector(getUncompleted);
  const daysOff = useSelector(getDaysOff);
  const holidays = useSelector(getHolidays);
  const loader = useSelector(getLoader);
  const exceptions = useSelector(getExceptions);

  const [selectedDay, setSelectedDay] = useState<Moment>(moment());
  const [timeSlots, setTimeSlots] = useState<TimeSlotDTO[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState<boolean>(undefined);
  //const [hasLoader, setLoader] = useState<boolean>(false);
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

    setIsFirstLoaded(false);

    // loader.map(loaderItem => {
    //   console.log(loaderItem.type)
    //   console.log(loaderItem.type === 'get schedule')
    //   //loaderItem.type === 'get schedule' ? setLoader(true) : setLoader(false);
    // })
  }, []);

  useEffect(() => {
    if(loader.length === 0 && isFirstLoaded === false) {
      setIsFirstLoaded(true);
    }
  }, [loader])

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

  const uncompletedWithoutSelectedDay: IDayWithTimeSlots = omit(uncompletedSchedule, [
    moment(selectedDay).format(timeSlotDateFormat),
  ]);
  const hasUncompleted = Boolean(
    uncompletedWithoutSelectedDay &&
      Object.values(uncompletedWithoutSelectedDay).reduce(
        (acc, day) =>
          acc +
          (day
            ? day.reduce(
                (acc, timeSlot) =>
                  acc +
                  (timeSlot
                    ? timeSlot.tasks.reduce(
                        (acc, task) =>
                          acc + (task ? (task.executions?.length ? 0 : 1) : 0),
                        0,
                      )
                    : 0),
                0,
              )
            : 0),
        0,
      ),
  );

  return (
    <div className={'schedule'}>
      <Calendar
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        daysInSchedule={daysInSchedule}
        schedule={schedule}
        uncompletedSchedule={uncompletedSchedule}
        holidays={holidays}
      />
      {Boolean(loader.filter((item) => item.type === LoaderAction.schedule.getSchedule)
        .length) && (
        <Loader isSmall={true} isAbsolute={true} />
      )}
      {/*<Loader isSmall={true} isAbsolute={true} />*/}
      <TaskList
        timeSlots={timeSlots}
        uncompletedDays={hasUncompleted ? uncompletedSchedule : undefined}
        dayOff={isCurrentDayOff}
        notHaveJourneys={exceptions.indexOf(journeyExceptionsEnum.notHaveExceptions) !== -1}
        holiday={isCurrentHoliday}
        loader={loader}
      />
    </div>
  );
};

export default Schedule;
