import React, { useState, useEffect } from 'react';
import moment from 'moment';

// static
import check from '@app/asset/images/confirm.png';
import back from '@app/asset/images/back.png';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { deleteDayOffAction, setDayOffAction } from '@app/controller/schedule/actions';
import { getDaysOff } from '@app/controller/schedule';

interface IProps {
  setModalOpened: () => void;
  date: Date;
}

const ModalWindow: React.FC<IProps> = ({ date, setModalOpened }) => {
  const dispatch = useDispatch();

  const daysOff = useSelector(getDaysOff);
  const currentDay = daysOff.find((day) =>
    moment(date).isSame(day.date, 'day'),
  );

  return (
    <div className="modal">
      <div className="modal-btn-wrapper">
        <div
          className="modal-btn__close"
          onClick={() => {
            if (currentDay) {
              dispatch(
                deleteDayOffAction.request({
                  ids: [currentDay.id],
                }),
              );
            } else {
              dispatch(
                setDayOffAction.request({
                  date,
                }),
              );
            }
            setModalOpened();
          }}>
          <img className="modal-btn-img" src={check} alt="img" />{' '}
          <span className="modal-btn-text">
            {currentDay ? 'I want to work' : 'Set as Day-Off'}
          </span>
        </div>
        <div className="modal-btn__dayoff" onClick={() => setModalOpened()}>
          {' '}
          <img className="modal-btn-img" src={back} alt="img" />
          <span className="modal-btn-text">Close</span>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
