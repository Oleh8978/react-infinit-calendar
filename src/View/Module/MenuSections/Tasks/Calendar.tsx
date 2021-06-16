import React from 'react';
import { Moment } from 'moment';

// components
import DayInCalendar from 'View/Schedule/Calendar/DayInCalendar';
import { Split } from '../../../../Component/Calendar/Split';

// date helper functionality

// interfaces
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';

interface IProps {
  days: Moment[];
  selectDay: (date: Moment) => void;
  selectedDay?: Moment;
}
const generateDays: React.FC<IProps> = ({
  days,
  selectedDay,
  selectDay,
}: IProps) => {
  let prevDay;
  return (
    <>
      {days.map((day, i, array) => {
        const dayEl = (
          <>
            {prevDay?.diff(day, 'day') > 1 ? <Split /> : ''}
            <DayInCalendar
              day={day}
              isSelected={day.isSame(selectedDay, 'day')}
              key={'day-' + day.format(timeSlotDateFormat)}
              hasUncompleted={false} // TODO: Make marker if has previously uncompleted
              hasEvents={false} // TODO: Make marker if has events
              selectDate={selectDay}
              isCustom={true}
              isLast={array.length - 1 === i}
            />
          </>
        );
        prevDay = day;
        return dayEl;
      })}
    </>
  );
};

const Calendar: React.FC<IProps> = (props) => {
  const { selectedDay } = props;
  return (
    <>
      <div className="tasks-calendar-headerdate">
        {selectedDay?.format('MMMM, YYYY')}
      </div>
      <div className={'tasks-calendar scrollbar__hidden'}>
        <div className="wrapper">
          {generateDays(props)}
          {/*{calendar.map((item) => {*/}
          {/*  const index = calendar.indexOf(item);*/}
          {/*  let isLastOne = false;*/}
          {/*  if (calendar.indexOf(item) === calendar.length - 1) {*/}
          {/*    isLastOne = true;*/}
          {/*  }*/}
          {/*  // return (*/}
          {/*  //   <DayInCalendar*/}
          {/*  //     key={`${item.date}`}*/}
          {/*  //     date={item.number}*/}
          {/*  //     fullDate={item.date}*/}
          {/*  //     dayWeek={item.name}*/}
          {/*  //     hasEvents={item.hasAnyEvents}*/}
          {/*  //     isClicked={item.isClicked}*/}
          {/*  //     selectDate={selectDate}*/}
          {/*  //     isCustom={true}*/}
          {/*  //     index={index}*/}
          {/*  //     isLastOne={isLastOne}*/}
          {/*  //     hasMorethanOnedayAfter={item.hasMorethanOnedayAfter}*/}
          {/*  //   />*/}
          {/*  // );*/}
          {/*})}*/}
        </div>
      </div>
    </>
  );
};

export default Calendar;
