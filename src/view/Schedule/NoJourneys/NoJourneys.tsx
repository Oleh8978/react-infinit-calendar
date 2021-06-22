import React, { useState, useEffect } from 'react';

// static images
import imageNoJourneys from '../fakeData/noJourneys/noJourneys.png'

interface IProps {}

const NoJourneys: React.FC<IProps> = () => {
  return (
    <div className="answer-nojourneys">
      <h1 className="answer-nojourneys-header__top">
        No active journeys
      </h1>
      <span className="answer-nojourneys-description">
        When you take a journey, you'll see your tasks here
      </span>
      <div className="answer-nojourneys-btn">Find a Journey</div>
      <img
        src={imageNoJourneys}
        className="answer-nojourneys-img"
        alt="img"
      />
    </div>
  );
};

export default NoJourneys;
