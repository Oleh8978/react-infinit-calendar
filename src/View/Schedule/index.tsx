import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';

interface IProps extends RouteComponentProps {}

const Schedule: React.FC<IProps> = () => {
  return (
    <div className={'schedule'}>
      <Calendar />
      <TaskList />
    </div>
  );
};

export default Schedule;
