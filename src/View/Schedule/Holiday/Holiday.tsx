import React, { useState, useEffect } from 'react';

import { holidays } from '../fakeData/fakedata';

interface IProps {
}

const Holiday: React.FC<IProps> = () => {
  return (
    <div className="answer-holiday">
      <h1 className="answer-holiday-header__top">{holidays[0].title}</h1>
      <span className="answer-holiday-description">
        It’s a federal holiday, but if you able to work click below
      </span>
      <span className="answer-holiday-icon">👇</span>
      <div className="answer-holiday-btn">I Want to Work</div>
    </div>
  );
};

export default Holiday;
