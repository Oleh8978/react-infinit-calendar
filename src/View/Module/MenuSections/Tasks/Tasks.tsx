import React, { useState } from 'react';

// components
import Calendar from './Calendar';
import Current from './Current';
import Uncompleted from './Uncompleted';

// interfaces
import { IDataToday, IDataPreviouse } from './Models';

// hardcoded data
import { data } from './HardcodedData/data';

// interfaces

interface IProps {}

const Task: React.FC<IProps> = () => {
  const today = new Date();
  const currentDate = today.toISOString();

  const firstDateIsPastDayComparedToSecond = (firstDate, secondDate) =>
    firstDate.setHours(0, 0, 0, 0) - secondDate.setHours(0, 0, 0, 0) < 0;
    
  const dateRender = (items) => {console.log('hi')};
  return (
    <div className={'tasks'}>
      <Calendar />
      <div className="tasks-wrapper">{0}</div>
    </div>
  );
};

export default Task;
