import React from 'react';

// utils
import { getMonthNameShort } from '../Calendar/utils';

interface ITask {
  date: string;
  description: string;
}

interface IProps {
  date: string;
  tasks: ITask[];
}

const PrevUncompleted: React.FC<IProps> = ({ date, tasks }) => {
  const dateTrnsformer = (dat) => {
    return (
      '' +
      getMonthNameShort(new Date(dat).getMonth()) +
      ' ' +
      new Date(dat).getDate()
    );
  };

  return (
    <div className={'task-previous'}>
      <div className={'task-previous-date'}>{dateTrnsformer(date)}</div>
      {tasks.map((item) => {
        return (
          <div className={'task-previous-description'} key={item.date}>
            {' '}
            <span>{item.description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PrevUncompleted;
