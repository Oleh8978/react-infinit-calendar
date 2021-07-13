import React, { useEffect, useState } from 'react';
import Link from '@app/routing/Link';
import { TaskDTO } from '@ternala/frasier-types';

export interface IProps {
  toggleTask: (data: {
    id: number;
    action: 'create' | 'remove';
    callback: (state: boolean) => void;
  }) => void;
  task: TaskDTO;
}

export const Task: React.FC<IProps> = ({ toggleTask, task }) => {
  const [isSelected, setSelected] = useState<boolean>(
    Boolean(task?.executions?.length),
  );

  // console.log('task?.executions')
  // console.log(task?.executions)

  useEffect(() => {
    setSelected(!!task?.executions?.length);
  }, [!!task?.executions?.length]);

  const callback = (state: boolean) => {
    setSelected(state);
  };

  return (
    <div className="tasks-current-task-wrapper" key={task.id}>
      <div className="tasks-current-task-checkbox">
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
      <div className="tasks-current-task-text-wrapper">
        <span
          className="tasks-current-task-text-header"
          style={{
            textDecorationLine: isSelected ? 'line-through' : 'none',
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
  );
};
