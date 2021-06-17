import React, { useState, useEffect } from 'react';

import { holidays } from '../fakeData/fakedata';
import { DayOffDTO } from '@ternala/frasier-types';
import { useDispatch } from 'react-redux';
import { deleteDayOffAction } from '../../../Controller/schedule/actions';

interface IProps {
  dayOff: DayOffDTO;
}

const Holiday: React.FC<IProps> = ({ dayOff }) => {
  const dispatch = useDispatch();
  return (
    <div className="answer-holiday">
      <h1 className="answer-holiday-header__top">{holidays[0].title}</h1>
      <span className="answer-holiday-description">
        It’s a federal holiday, but if you able to work click below
      </span>
      <span className="answer-holiday-icon">👇</span>
      <div
        className="answer-holiday-btn"
        onClick={() => {
          dispatch(
            deleteDayOffAction.request({
              ids: [dayOff.id],
            }),
          );
        }}>
        I Want to Work
      </div>
    </div>
  );
};

export default Holiday;
