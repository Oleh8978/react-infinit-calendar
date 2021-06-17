import React from 'react';
import { TaskDTO } from '@ternala/frasier-types';

// components
import Link from 'Routing/Link';

interface IProps {
  task: TaskDTO;
  toggleTask: (id: number, action: 'create' | 'remove') => void;
}

const UncompletedListItem: React.FC<IProps> = ({ task, toggleTask }) => {
  return (
    <>
      <div className="tasks-uncompleted-item" key={task.id + ''}>
        {' '}
        <div className="tasks-uncompleted-item-checkbox">
          <input
            type="checkbox"
            className="tasks-current-task-checkbox-check"
            checked={!!task?.executions?.length}
            onChange={() => {
              toggleTask(task.id, !!task?.executions?.length ? 'remove' : "create");
            }}
          />
        </div>
        <div className="tasks-uncompleted-item-textwrapper">
          <span
            className="tasks-uncompleted-item-title"
            style={{
              textDecoration: !!task?.executions?.length
                ? 'line-through'
                : 'unset',
            }}>
            {task.title}
          </span>
          {task?.sections?.length > 0 ? (
            <Link to={'read-more'} className="tasks-current-task-text-link">
              Read more
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default UncompletedListItem;
