import React, { useState, useEffect } from 'react';

// static images
import imageDayOff from '../fakeData/dayOff/dayOff.png';

interface IProps {}

const DayOff: React.FC<IProps> = () => {
  return (
    <div className="answer-dayoff">
      <h1 className="answer-dayoff-header__top">day-off</h1>
      <div className="answer-dayoff-description">
        <span>
          You have set this day as a day-off. Be ware, that these tasks will be
          be added to next weeks journey.
        </span>
        <span>If you want to continue working, click below.</span>
      </div>
      <div className="answer-dayoff-btn">I Want to Work</div>
      <img src={imageDayOff} className="answer-dayoff-img" alt="img" />
    </div>
  );
};

export default DayOff;
