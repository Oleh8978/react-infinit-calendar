import React, { useState, useEffect } from 'react';

// components
import Task from './Task';

// interfaces
import { ICalendarData, IListCalendarItem } from './Models';

interface IProps {
  currentData: ICalendarData[];
  setCheckButton: (id: number) => void;
}

const Current: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'tasks-current'}>
      {props.currentData &&
        props.currentData[0].tasks.map((item) => {
          return (
            <Task
              tasks={item.items}
              time={item.time}
              toDo={item.timeToDo}
              setCheckButton={props.setCheckButton}
            />
          );
        })}
    </div>
  );
};

export default Current;
