import React from 'react';
import { DayOffDTO } from '@ternala/frasier-types';
import { useDispatch } from 'react-redux';

// static images
import imageDayOff from '../fakeData/dayOff/dayOff.png';

// Actions
import { deleteDayOffAction } from '../../../Controller/schedule/actions';

interface IProps {
  dayOff: DayOffDTO;
}

const DayOff: React.FC<IProps> = ({ dayOff }) => {
  const dispatch = useDispatch();
  return (
    <div className="answer-dayoff">
      <h1 className="answer-dayoff-header__top">day-off</h1>
      <div className="answer-dayoff-description">
        <span>
          You have set this day as a day-off. Beware, that these tasks will be
          be added to next weeks journey.
        </span>
        <span>If you want to continue working, click below.</span>
      </div>
      <div
        className="answer-dayoff-btn"
        onClick={() => {
          dispatch(
            deleteDayOffAction.request({
              ids: [dayOff.id],
            }),
          );
        }}>
        I Want to Work
      </div>
      <img src={imageDayOff} className="answer-dayoff-img" alt="img" />
    </div>
  );
};

export default DayOff;
