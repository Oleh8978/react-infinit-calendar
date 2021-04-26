import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Calendar from './Calendar/Calendar';

interface IProps extends RouteComponentProps {}

const Schedule: React.FC<IProps> = () => {
  return (
    <div className={'schedule'}>
      <Calendar />
    </div>
  );
};

export default Schedule;
