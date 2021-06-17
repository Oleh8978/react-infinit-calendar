import React, { useState } from 'react';
import moment from 'moment';

// history API
import history from '../../../historyApi';
import InternalLink from '../../../Routing/Link';
import { timeConvert } from '../../../Utils/timeConverter';

interface IProps {
  date: number;
  description: string;
  isCompleted: boolean;
  time: number;
  moduleId: number;
}

const Task: React.FC<IProps> = ({
  date,
  description,
  isCompleted,
  time,
  moduleId,
}) => {
  const [clap, setClap] = useState<string>('👏');

  const navigationModule = () => {
    console.log('history ', history);
    history.push('/module');
  };

  if (isCompleted) {
    return (
      <>
        <InternalLink
          to={'module-tab'}
          params={{
            tabName: 'task',
            id: String(moduleId),
          }}
          className={'task-completed'}
          onClick={() => {
            navigationModule();
          }}>
          <div className={'task-completed-genralinfo-wrapper'}>
            <div className={'task-completed-timepanel'}>
              {moment.utc(date * 60 * 1000).format('HH:mm A')} |{' '}
              {timeConvert(time)}
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
        </InternalLink>
      </>
    );
  }

  if (!isCompleted) {
    return (
      <>
        <InternalLink
          to={'module-tab'}
          params={{
            tabName: 'task',
            id: String(moduleId),
          }}
          className={'task-completed'}
          onClick={() => {
            navigationModule();
          }}>
          <div className={'task-completed-genralinfo-wrapper'}>
            <div className={'task-completed-timepanel__uncompleted'}>
              {moment.utc(date * 60 * 1000).format('HH:mm A')} |{' '}
              {timeConvert(time)}
            </div>
          </div>
          <div className={'task-completed-descriptionbox'}>{description}</div>
        </InternalLink>
      </>
    );
  }
};

export default Task;
