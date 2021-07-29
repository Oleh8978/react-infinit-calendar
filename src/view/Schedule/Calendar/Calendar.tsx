import React, { useState } from 'react';
import { Moment } from 'moment';
import { timeSlotDateFormat } from '@ternala/frasier-types/lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper';
import moment from 'moment';
// custom components
import DayInCalendar from './DayInCalendar';
import ModalWindow from './ModalWindow/modalWindow';

// images
import calendarImg from '@app/asset/images/calendar.svg';

// HOC
import useScrollListener from './customHOC';

// date object functionality
import * as dateObject from './utils';
import { IDayWithTimeSlots } from '@ternala/frasier-types';
import { HolidayDTO } from '@ternala/frasier-types/lib/modules/holiday/holiday.dto';

export interface IHeaderDate {
  month: string;
  year: string;
}

export interface ICurrentDate {
  month: number;
  year: number;
}

interface IProps {
  setSelectedDay: (day: Moment) => void;
  selectedDay: Moment;
  daysInSchedule: Moment[];
  schedule: IDayWithTimeSlots;
  uncompletedSchedule: IDayWithTimeSlots;
  holidays?: HolidayDTO[];
}

const Calendar: React.FC<IProps> = ({
  setSelectedDay,
  selectedDay,
  daysInSchedule,
  uncompletedSchedule,
  schedule,
  holidays,
}) => {
  let selectedItem = 0;

  daysInSchedule.forEach((day, i) => {
    if (moment(selectedDay).isSame(day, 'day')) {
      selectedItem = i;
    }
  });

  const swiperOptions: SwiperOptions = {
    slidesPerView: 'auto',
    // centeredSlides: true,
    initialSlide: selectedItem,
  };

  // const fieldRef = React.useRef<HTMLInputElement>(null);
  // const calendar = [];

  // const [calendarRenderedData, setCalendarRenderedData] = useState(calendar);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  // const [scrollType, setScrollType] = useState<string>('right');

  // const directionChecker = () => {
  //   const ele = document.querySelector('.calendar-days') as HTMLElement;
  //
  //   let pos = { top: 0, left: 0, x: 0, y: 0 };
  //
  //   const mouseDownHandler = (e) => {
  //     pos = {
  //       left: ele.scrollLeft,
  //       top: ele.scrollTop,
  //       // Get the current mouse position
  //       x: e.clientX,
  //       y: e.clientY,
  //     };
  //
  //     document.addEventListener('mousemove', mouseMoveHandler);
  //     document.addEventListener('mouseup', mouseUpHandler);
  //   };
  //
  //   const mouseMoveHandler = (e) => {
  //     // direction
  //     if (Math.sign(e.clientX - pos.x) === -1) {
  //       setScrollType('right');
  //     } else {
  //       setScrollType('left');
  //     }
  //   };
  //
  //   const mouseUpHandler = () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //     document.removeEventListener('mouseup', mouseUpHandler);
  //   };
  //
  //   if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  // };
  //
  // const moseMover = (ele) => {
  //   let pos = { top: 0, left: 0, x: 0, y: 0 };
  //
  //   const mouseDownHandler = (e) => {
  //     pos = {
  //       left: ele.scrollLeft,
  //       top: ele.scrollTop,
  //       // Get the current mouse position
  //       x: e.clientX,
  //       y: e.clientY,
  //     };
  //
  //     document.addEventListener('mousemove', mouseMoveHandler);
  //     document.addEventListener('mouseup', mouseUpHandler);
  //   };
  //
  //   const mouseMoveHandler = (e) => {
  //     // How far the mouse has been moved
  //     const dx = e.clientX - pos.x;
  //     const dy = e.clientY - pos.y;
  //
  //     // Scroll the element
  //     ele.scrollTop = pos.top - dy;
  //     ele.scrollLeft = pos.left - dx;
  //   };
  //
  //   const mouseUpHandler = () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler);
  //     document.removeEventListener('mouseup', mouseUpHandler);
  //   };
  //
  //   // Attach the handler
  //   if (ele !== null) ele.addEventListener('mousedown', mouseDownHandler);
  // };

  // useEffect(() => {
  //   const calendarHolder = document.querySelector(
  //     '.calendar-days',
  //   ) as HTMLElement;
  //   moseMover(calendarHolder);
  // }, []);

  // const dateAdder = () => {
  //   const calendarHolder = document.querySelector(
  //     '.calendar-days',
  //   ) as HTMLElement;
  //   const schedule = document.querySelector('.schedule') as HTMLElement;
  //
  //   const scrolled = calendarHolder.scrollLeft;
  //   const windowWidth = schedule.offsetWidth;
  //   const blockWidth = schedule.scrollWidth;
  //   // directionChecker(calendarHolder);
  //   if (scrollType === 'left') {
  //     let arr = [];
  //     if (calendarRenderedData.length !== 0) {
  //       const date = new Date(calendarRenderedData[0].date);
  //
  //       date.setDate(date.getDate() - 1);
  //       arr.push({
  //         number: date.getDate(),
  //         date: dateObject.dateCreator(
  //           date.getDate(),
  //           date.getMonth() + 1,
  //           date.getFullYear(),
  //         ),
  //         name:
  //           dateObject.days[
  //             new Date(
  //               date.getFullYear(),
  //               date.getMonth(),
  //               date.getDate(),
  //             ).getDay()
  //           ],
  //         hasAnyEvents: false,
  //         isClicked: false,
  //       });
  //       // setCalendarRenderedData(arr.concat(calendarRenderedData));
  //       // calendarHolder.scrollTo(72, 0);
  //       arr = [];
  //     }
  //   }
  //   if (scrollType === 'right') {
  //     if (calendarRenderedData.length !== 0) {
  //       const date = new Date(
  //         calendarRenderedData[calendarRenderedData.length - 1].date,
  //       );
  //
  //       let calRendData = [];
  //
  //       date.setDate(date.getDate() + 1);
  //       calRendData.push({
  //         number: date.getDate(),
  //         date: dateObject.dateCreator(
  //           date.getDate(),
  //           date.getMonth() + 1,
  //           date.getFullYear(),
  //         ),
  //         name:
  //           dateObject.days[
  //             new Date(
  //               date.getFullYear(),
  //               date.getMonth(),
  //               date.getDate(),
  //             ).getDay()
  //           ],
  //         hasAnyEvents: false,
  //         isClicked: false,
  //       });
  //
  //       // setCalendarRenderedData(calendarRenderedData.concat(calRendData));
  //
  //       calRendData = [];
  //     }
  //   }
  // };
  // useScrollListener(fieldRef, directionChecker, 4000);
  // useScrollListener(fieldRef, dateAdder, 4000);

  // const selectDate = (date: string) => {
  //   if (!calendarRenderedData.find((item) => item.isClicked === true)) {
  //     calendarRenderedData.map((item) => {
  //       if (item.date === date) {
  //         const arr = [...calendarRenderedData];
  //         arr[calendarRenderedData.indexOf(item)].isClicked = true;
  //         setCalendarRenderedData(arr);
  //       }
  //     });
  //   } else {
  //     const arr = [...calendarRenderedData];
  //     calendarRenderedData.map((item) => {
  //       if (item.date !== date) {
  //         arr[calendarRenderedData.indexOf(item)].isClicked = false;
  //       } else {
  //         arr[calendarRenderedData.indexOf(item)].isClicked = true;
  //         setCalendarRenderedData(arr);
  //         getDayAndRecords(item.date);
  //       }
  //     });
  //     setHeaderDate({
  //       month: String(dateObject.getMonthName(new Date(date).getMonth())),
  //       year: String(new Date(date).getFullYear()),
  //     });
  //   }
  // };

  // if (calendar.find((item) => item.isSelected === true)) {
  //   console.log('one day is selected ');
  // } else {
  //   dateObject.currentWeekedays(currentMonth, currentYear, calendar)
  //   // seting first array of dats to calendar !!! do not remove !!!
  //   // dateObject.monthArr(currentMonth, currentYear, calendar);
  //
  //   calendar.map((item) => {
  //     console.log(`String(
  //       dateObject.dateCreator(
  //         new Date().getDate(),
  //         new Date().getMonth() + 1,
  //         new Date().getFullYear(),
  //       )`, String(
  //         dateObject.dateCreator(
  //           new Date().getDate(),
  //           new Date().getMonth() + 1,
  //           new Date().getFullYear(),
  //         )));
  //     if (
  //       String(item.date) ===
  //       String(
  //         dateObject.dateCreator(
  //           new Date().getDate(),
  //           new Date().getMonth() + 1,
  //           new Date().getFullYear(),
  //         ),
  //       )
  //     ) {
  //       calendar[calendar.indexOf(item)].isClicked = true;
  //     }
  //   });
  // }

  const setModalOpened = () => {
    if (!isModalOpened) {
      setIsModalOpened(true);
    } else {
      setIsModalOpened(false);
    }
  };

  const dates = daysInSchedule.map((item, i, array) => {
    return (
      <SwiperSlide>
        <DayInCalendar
          day={item}
          isSelected={item.isSame(selectedDay, 'day')}
          key={'day-' + item.format(timeSlotDateFormat)}
          hasUncompleted={Boolean(
            uncompletedSchedule?.[item?.format(timeSlotDateFormat)],
          )}
          hasEvents={Boolean(schedule?.[item?.format(timeSlotDateFormat)])}
          holidays={holidays}
          selectDate={setSelectedDay}
          isCustom={false}
          isLast={array.length - 1 === i}
        />
      </SwiperSlide>
    );
  });
  return (
    <div className={'calendar'}>
      {isModalOpened ? (
        <ModalWindow
          setModalOpened={setModalOpened}
          date={selectedDay.toDate()}
        />
      ) : (
        <></>
      )}
      <div className="calendar-headwraper">
        <img src={calendarImg} className="calendar-img" alt="img" />
        <span className="calendar-mnth">
          {selectedDay.format('MMMM, YYYY')}
        </span>
        <div
          className={'calendar-contentmenu-wrapper'}
          onClick={() => setModalOpened()}>
          <span className={'calendar-contentmenu-menu1'} />
          <span className={'calendar-contentmenu-menu2'} />
          <span className={'calendar-contentmenu-menu3'} />
        </div>
      </div>
      <div className="calendar-days scrollbar__hidden">
        <Swiper {...swiperOptions}>{dates}</Swiper>
      </div>
    </div>
  );
};

export default Calendar;
