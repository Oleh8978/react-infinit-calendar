import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';
import NoTasks from './NoTasks/NoTasks';
import DayOff from './DayOff/DayOff';
import NoJourneys from './NoJourneys/NoJourneys';
import TrialExpired from './TrialExpired/TrialExpired';
import Holiday from './Holiday/Holiday';

interface IProps extends RouteComponentProps {
  absoluteBlock: string;
}

const Schedule: React.FC<IProps> = ({absoluteBlock }) => {
  return (
    <div className={'schedule'}>
      <Calendar />
      <TaskList />
    </div>
  );
};

export default Schedule;
