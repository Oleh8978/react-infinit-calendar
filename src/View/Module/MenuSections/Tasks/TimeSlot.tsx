import React from 'react';
import { TaskDTO } from '@ternala/frasier-types';

// components
import Link from 'Routing/Link';

// Utils
import moment from 'moment';
import { timeConvert } from '../../../../Utils/timeConverter';

interface IProps {
  tasks: TaskDTO[];
  time: number;
  duration: number;
  toggleTask: (id: number, action: 'create' | 'remove') => void;
}

const TimeSlot: React.FC<IProps> = ({ time, toggleTask, ...props }) => {
  return (
    <div className={'tasks-current-task'}>
      <div className="tasks-current-task-timetodo">
        <span className="tasks-current-task-timetodo-time">
          {moment.utc(time * 60 * 1000).format('HH:mm A')}
        </span>{' '}
        <span className="tasks-current-task-timetodo-spendtime">
          | {timeConvert(props.duration)}
        </span>
      </div>
      {props.tasks.map((task) => {
        return (
          <div className="tasks-current-task-wrapper" key={task.id}>
            <div className="tasks-current-task-checkbox">
              <input
                type="checkbox"
                className="tasks-current-task-checkbox-check"
                checked={!!task?.executions?.length}
                onChange={() => {
                  toggleTask(
                    task.id,
                    !!task?.executions?.length ? 'remove' : 'create',
                  );
                }}
              />
            </div>
            <div className="tasks-current-task-text-wrapper">
              <span
                className="tasks-current-task-text-header"
                style={{
                  textDecorationLine: !!task?.executions?.length
                    ? 'line-through'
                    : 'none',
                }}>
                {task.title}
              </span>
              {task?.sections?.length > 0 ? (
                <Link className="tasks-current-task-text-link" to={'read-more'}>
                  Read more
                </Link>
              ) : (
                <> </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlot;
