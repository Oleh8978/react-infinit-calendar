import React, { useEffect, useState } from 'react';

import Task from './Task';
import PrevUncompleted from './PrevUncompleted';

import { data, prevDataUncompleted } from '../fakeData/fakedata';

interface IProps {}

const TaskList: React.FC<IProps> = () => {
  const isAnyUncopleted = true;
  return (
    <div className={'modules-list'}>
      <div className={'modules-list__completed'}>
        {data.tasks.map((item) => {
          return (
            <Task
              description={item.description}
              date={item.date}
              time={item.time}
              status={item.status}
            />
          );
        })}
      </div>
      {isAnyUncopleted ? (
        <div className={'modules-list__uncompleted'}>
          <h1 className={'modules-list__uncompleted-header'}>
            Previously Uncompleted
          </h1>
          <div className={'modules-list__uncompleted-list'}>
            {prevDataUncompleted.map((item) => {
              return <PrevUncompleted date={item.date} tasks={item.tasks} />;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
