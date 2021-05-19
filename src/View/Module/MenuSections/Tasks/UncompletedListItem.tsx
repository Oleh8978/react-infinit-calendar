import React, { useState, useEffect } from 'react';

// components
import Link from 'Routing/Link';

//interfaces
import { ITask } from './Models';

interface IProps {
  element: ITask | any;
  setCheckButton: (id: number) => void;
}

const UncompletedListItem: React.FC<IProps> = ({ ...props }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <div className="tasks-uncompleted-item" key={props.element.id + ''}>
        {' '}
        <div className="tasks-uncompleted-item-checkbox">
          <input
            type="checkbox"
            className="tasks-current-task-checkbox-check"
            checked={isChecked}
            onChange={() => {
              props.setCheckButton(props.element.id);
              setIsChecked(true);
            }}
          />
        </div>
        <div className="tasks-uncompleted-item-textwrapper">
          <span
            className="tasks-uncompleted-item-title"
            style={{
              textDecoration: isChecked ? 'line-through' : 'unset',
            }}>
            {props.element.title}
          </span>
          {props.element.text.length > 0 ? (
            <Link to={'read-more'} className="tasks-current-task-text-link">
              {/* <span
              className="tasks-current-task-text-link"
              onClick={() => console.log('read more')}> */}
              Read more
              {/* </span> */}
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
