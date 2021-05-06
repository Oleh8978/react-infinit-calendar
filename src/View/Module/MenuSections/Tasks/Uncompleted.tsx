import React, { useState } from 'react';

// components
import UncompletedTask from './UncompletedTask';

// interfaces
import { ICalendarData } from './Models';

interface IProps {
  prevData: ICalendarData[];
}

const Uncompleted: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'tasks-uncompleted'}>
      <span className="tasks-uncompleted-header">Previously uncompleted</span>
      <div className="tasks-uncompleted-wrapper">
        {props.prevData.map((item) => {
          return <UncompletedTask data={item}/>
        })}
      </div>
    </div>
  );
};

export default Uncompleted;
