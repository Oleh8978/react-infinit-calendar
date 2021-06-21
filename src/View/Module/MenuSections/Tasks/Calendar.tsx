import React from 'react';
import moment, { Moment } from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';

// components
import DayInCalendar from '@app/view/Schedule/Calendar/DayInCalendar';
import { Split } from '@app/component/Calendar/Split';

// date helper functionality

// interfaces
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';
import { SwiperOptions } from 'swiper';
import { IDayWithTimeSlots } from '@ternala/frasier-types';

interface IProps {
  days: Moment[];
  selectDay: (date: Moment) => void;
  selectedDay?: Moment;
  uncompletedSchedule: IDayWithTimeSlots;
}
const generateDays: React.FC<IProps> = ({
  days,
  selectedDay,
  selectDay,
  uncompletedSchedule
}: IProps) => {
  let prevDay;
  return (
    <>
      {days.map((day, i, array) => {
        const dayEl = (
          <SwiperSlide>
            {prevDay?.diff(day, 'day') > 1 ? <Split /> : ''}
            <DayInCalendar
              day={day}
              isSelected={day.isSame(selectedDay, 'day')}
              key={'day-' + day.format(timeSlotDateFormat)}
              hasUncompleted={Boolean(
                uncompletedSchedule?.[day?.format(timeSlotDateFormat)],
              )}
              hasEvents={true}
              selectDate={selectDay}
              isCustom={true}
              isLast={array.length - 1 === i}
            />
          </SwiperSlide>
        );
        prevDay = day;
        return dayEl;
      })}
    </>
  );
};

const Calendar: React.FC<IProps> = (props) => {
  let selectedItem = 0;
  const { selectedDay } = props;

  props.days.forEach((day, i) => {
    if (moment(selectedDay).isSame(day, 'day')) {
      selectedItem = i;
    }
  });

  const swiperOptions: SwiperOptions = {
    slidesPerView: 'auto',
    // centeredSlides: true,
    initialSlide: selectedItem,
  };

  return (
    <>
      <div className="tasks-calendar-headerdate">
        {selectedDay?.format('MMMM, YYYY')}
      </div>
      {props.days?.length && selectedDay ? (
        <div className={'tasks-calendar scrollbar__hidden'}>
          {console.log('swiperOptions: ', swiperOptions)}
          <div className="wrapper">
            <Swiper {...swiperOptions}>{generateDays(props)}</Swiper>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Calendar;
