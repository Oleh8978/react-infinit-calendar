import React, { useState, useEffect } from 'react';

// components
import UncompletedTask from './UncompletedTask';

// interfaces
import { ICalendarData } from './Models';

interface IProps {
  prevData: ICalendarData[];
  setCheckButton: (id: number) => void;
}

const Uncompleted: React.FC<IProps> = ({ ...props }) => {

  return (
    <div className={'tasks-uncompleted'}>
      <span className="tasks-uncompleted-header">Previously uncompleted</span>
      <div className="tasks-uncompleted-wrapper">
        {props.prevData.map((item) => {
          return (
            <UncompletedTask
              data={item}
              setCheckButton={props.setCheckButton}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Uncompleted;
