import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Calendar from './Calendar/Calendar';
import TaskList from './TaskList/TaskList';
import NoTasks from './NoTasks/NoTasks';
import DayOff from './DayOff/DayOff';
import NoJourneys from './NoJourneys/NoJourneys';
import TrialExpired from './TrialExpired/TrialExpired';
import Holiday from './Holiday/Holiday';
import WellDone from './WellDone/WellDone';

// fake data
import { events } from './fakeData/fakedata';

//utils
import * as dateObject from './Calendar/utils';

interface IProps extends RouteComponentProps {
  absoluteBlock: string;
}

const Schedule: React.FC<IProps> = ({ absoluteBlock }) => {
  const [selectedDay, setSelectedDay] = useState<any>('');

  const getDayAndRecords = (day: any) => {
    setSelectedDay(String(day));
  };

  const scheduleData = (data) => {
    let element = <TaskList />;
    data.find((item) => {
      if (
        String(
          dateObject.dateCreator(
            new Date(item.day).getDate(),
            new Date(item.day).getMonth() + 1,
            new Date(item.day).getUTCFullYear(),
          ),
        ) === String(selectedDay)
      ) {
        if (item.hasAnyEvents) {
          element = <TaskList />;
        }

        if (item.isHolidays) {
          element = <Holiday />;
        }

        if (item.isDayOff) {
          element = <DayOff />;
        }

        if (item.isTrialExpired) {
          element = <TrialExpired />;
        }

        if (item.hasNoActiveJourneys) {
          element = <NoJourneys />;
        }
      }
    });

    return element;
  };
  const isTaskCompleated = false;
  return (
    <div className={'schedule'}>
      {isTaskCompleated ? <WellDone /> : <></>}
      <Calendar getDayAndRecords={getDayAndRecords} />
      {scheduleData(events)}
    </div>
  );
};

export default Schedule;
