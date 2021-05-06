import React, { useState, useEffect } from 'react';

// components
import Task from './Task';

// interfaces
import { ICalendarData, IListCalendarItem } from './Models';

interface IProps {
  currentData: ICalendarData[];
}

const Current: React.FC<IProps> = ({ ...props }) => {
  const [data, setData] = useState<ICalendarData[] | undefined>();

  useEffect(() => {
    if (props.currentData !== undefined) {
      setData(props.currentData);
    }
  }, [props.currentData]);

  return (
    <div className={'tasks-current'}>
      {data &&
        data[0].tasks.map((item) => {
          return (
            <Task tasks={item.items} time={item.time} toDo={item.timeToDo} />
          );
        })}
    </div>
  );
};

export default Current;
