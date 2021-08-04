import React from 'react';
import { useDispatch } from 'react-redux';
import { HolidayDTO } from '@ternala/frasier-types';
import fingerDown from '../../../asset/images/emoji/👇.png';

// Actions
import { deleteHolidayDataAction } from '@app/controller/holidays/actions';

interface IProps {
  holiday: HolidayDTO;
}

const Holiday: React.FC<IProps> = ({ holiday }) => {
  const dispatch = useDispatch();
  return (
    <div className="answer-holiday">
      <h1 className="answer-holiday-header__top">{holiday.title}</h1>
      <span className="answer-holiday-description">{holiday.message}</span>
      <span className="answer-holiday-icon">
        <img src={fingerDown} alt="" />
      </span>
      <div
        className="answer-holiday-btn"
        onClick={() => {
          dispatch(
            deleteHolidayDataAction.request({
              holiday: holiday.id,
            }),
          );
        }}>
        I Want to Work
      </div>
    </div>
  );
};

export default Holiday;
