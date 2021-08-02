import React from 'react';
import moment, { Moment } from 'moment';
import { HolidayDTO } from '@ternala/frasier-types/lib/modules/holiday/holiday.dto';

interface IProps {
  day: Moment;
  isSelected: boolean;
  hasUncompleted: boolean;
  hasEvents: boolean;
  holidays?: HolidayDTO[];
  selectDate: (date: Moment) => void;
  isCustom: boolean;
  index?: number;
  isLast: boolean;
  hasMorethanOnedayAfter?: boolean;
}

const generateDayContent = ({
  day,
  isSelected,
  selectDate,
  hasEvents,
  holidays,
  hasUncompleted,
}: IProps) => {
  const isToday = moment().isSame(day, 'day');

  return (
    <>
      {isToday ? (
        <span
          className="calendar-day-today"
          style={{ textTransform: 'uppercase' }}>
          Today
        </span>
      ) : (
        <span className="calendar-day-today" style={{ height: 26 }} />
      )}
      <div
        className={
          (isSelected ? 'calendar-day selected-card' : 'calendar-day') +
          (hasEvents ? '' : ' without-tasks ')
          // (hasFreeDay ? ' free-day ' : '')
        }
        onClick={() => selectDate(day)}>
        <div className={'calendar-day-dayweek'}>
          {moment(day).format('ddd')}
        </div>
        <div className={'calendar-day-date'}>{moment(day).format('D')}</div>
      </div>
      {hasUncompleted ? <div className={'calendar-day-marked'} /> : <></>}
    </>
  );
};

export const DayInCalendar: React.FC<IProps> = (props) => {
  return (
    <>
      <div
        className="calendar-day-wrapper"
        style={
          props.isCustom
            ? props.hasMorethanOnedayAfter
              ? {
                  marginLeft: '10px',
                  marginRight: '10px',
                }
              : { marginRight: props.isLast ? '10px' : '0px' }
            : {}
        }>
        {generateDayContent(props)}
      </div>
      {!!props.hasMorethanOnedayAfter && (
        <div className="calendar-day-divider">
          <div className="calendar-day-dots-first" />
          <div className="calendar-day-dots" />
          <div className="calendar-day-dots" />
        </div>
      )}
    </>
  );
};

export default DayInCalendar;
