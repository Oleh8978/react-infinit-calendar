import React, { useEffect, useState } from 'react';
import { TaskDTO } from '@ternala/frasier-types';

// components
import Link from '@app/routing/Link';

interface IProps {
  task: TaskDTO;
  toggleTask: (data: {
    id: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => void;
}

const UncompletedListItem: React.FC<IProps> = ({ task, toggleTask }) => {
  const [isSelected, setSelected] = useState<boolean>(
    Boolean(task?.executions?.length),
  );

  useEffect(() => {
    setSelected(!!task?.executions?.length);
  }, [!!task?.executions?.length]);

  const callback = (state: boolean) => {
    setSelected(state);
  };

  return (
    <>
      <div className="tasks-uncompleted-item" key={task.id + ''}>
        {' '}
        <div className="tasks-uncompleted-item-checkbox">
          <input
            type="checkbox"
            className="tasks-current-task-checkbox-check"
            checked={isSelected}
            onChange={() => {
              toggleTask({
                id: task.id,
                action: isSelected ? 'remove' : 'create',
                callback,
              });
              setSelected(!isSelected);
            }}
          />
        </div>
        <div className="tasks-uncompleted-item-textwrapper">
          <span
            className="tasks-uncompleted-item-title"
            style={{
              textDecoration: isSelected ? 'line-through' : 'unset',
            }}>
            {task.title}
          </span>
          {task?.sections?.length > 0 ? (
            <Link
              to={'task'}
              params={{ id: String(task.id) }}
              className="tasks-current-task-text-link">
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
