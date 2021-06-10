import React, { useState, useEffect } from 'react';

// components
import Link from 'Routing/Link';

// interfaces
import { ITask } from './Models';

// utils
import { formatAMPM } from './utils';

interface IProps {
  tasks: ITask[];
  time: string;
  toDo: number;
  setCheckButton: (id: number) => void;
}

const Task: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'tasks-current-task'}>
      <div className="tasks-current-task-timetodo">
        <span className="tasks-current-task-timetodo-time">
          {formatAMPM(new Date(props.time))}
        </span>
        <span className="tasks-current-task-timetodo-spendtime">
          | {props.toDo} min
        </span>
      </div>
      {props.tasks.map((item) => {
        return (
          <div className="tasks-current-task-wrapper" key={item.id}>
            <div className="tasks-current-task-checkbox">
              <input
                type="checkbox"
                className="tasks-current-task-checkbox-check"
                checked={item.isChecked ? true : false}
                onChange={() => {
                  props.setCheckButton(item.id);
                }}
              />
            </div>
            <div className="tasks-current-task-text-wrapper">
              <span
                className="tasks-current-task-text-header"
                style={{
                  textDecorationLine: item.isChecked ? 'line-through' : 'none',
                }}>
                {item.title}
              </span>
              {item.text.length > 0 ? (
                // <span
                //   className="tasks-current-task-text-link"
                //   onClick={() => console.log('read more')}>
                <Link className="tasks-current-task-text-link" to={'read-more'}>
                  Read more
                </Link>
              ) : (
                // </span>
                <> </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Task;
