import React, { useState } from 'react';

import { data } from '../fakeData/fakedata';
import completed from '../../../Asset/images/completed.png';
// history API
import history from '../../../historyApi';

interface IProps {
  date: string;
  description: string;
  status: string;
  time: number;
}

const Task: React.FC<IProps> = ({ date, description, status, time }) => {
  const [clap, setClap] = useState<string>('👏');
  const timeConvert = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);

    if (rhours !== 0) {
      return rhours + ' H ' + rminutes + ' MIN';
    }

    if (rminutes !== 0 && rhours === 0) {
      return rminutes + ' MIN';
    }
  };

  const navigationModule = () => {
    console.log('history ', history);
    history.push('/module');
  };

  if (status === 'completed') {
    console.log(' date from page ', date)
    return (
      <>
        <div
          className={'task-completed'}
          onClick={() => {
            navigationModule();
          }}>
          <div className={'task-completed-genralinfo-wrapper'}>
            <div className={'task-completed-timepanel'}>
              {new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              | {timeConvert(time)}
            </div>
            <div className={'task-completed__info'}>
              {/* <img
                className={'task-completed__info-img'}
                src={completed}
                alt="completed"
              /> */}
              <div className="task-completed__info-text">
                <span className="task-completed__info-text-completed">
                  Completed
                </span>{' '}
                <span className="task-completed__info-text-completed-clap">
                  {' '}
                  {clap}
                </span>
              </div>
            </div>
          </div>
          <div
            className={'task-completed-descriptionbox'}
            style={{
              textDecorationLine: 'line-through',
              color: ' rgba(29, 29, 29, 0.5)',
            }}>
            {description}
          </div>
        </div>
      </>
    );
  }

  if (status === 'uncompleted') {
    return (
      <>
        <div
          className={'task-completed'}
          onClick={() => {
            navigationModule();
          }}>
          <div className={'task-completed-genralinfo-wrapper'}>
            <div className={'task-completed-timepanel__uncompleted'}>
              {new Date(date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              | {timeConvert(time)}
            </div>
          </div>
          <div className={'task-completed-descriptionbox'}>{description}</div>
        </div>
      </>
    );
  }
};

export default Task;
