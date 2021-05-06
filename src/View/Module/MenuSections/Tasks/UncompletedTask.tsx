import React, { useState } from 'react';

// interfaces
import { ICalendarData } from './Models';

// utils
import { numDayShortMonth } from './utils';

interface IProps {
  data: ICalendarData;
}

const UncompletedTask: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'tasks-uncompleted'}>
      <span className="tasks-uncompleted-headeritem">
        {numDayShortMonth(props.data.time)}
      </span>
      {props.data.tasks.map((item) => {
        return item.items.map((elem) => {
          if (elem.isChecked === false) {
            return (
              <div className="tasks-uncompleted-item">
                {' '}
                <div className="tasks-uncompleted-item-checkbox">
                  <input
                    type="checkbox"
                    className="tasks-current-task-checkbox-check"
                    checked={false}
                    onChange={() => {
                      console.log('click');
                    }}
                  />
                </div>
                <div className="tasks-uncompleted-item-textwrapper">
                  <span className="tasks-uncompleted-item-title">
                    {elem.title}
                  </span>
                  {elem.text.length > 0 ? (
                    <span
                      className="tasks-current-task-text-link"
                      onClick={() => console.log('read more')}>
                      Read more
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          }
        });
      })}
    </div>
  );
};

export default UncompletedTask;
