import React from 'react';

// static images
import imageNoJourneys from '@app/asset/images/noJourneys.png';
import Link from '@app/routing/Link';

interface IProps {}

const NoJourneys: React.FC<IProps> = () => {
  return (
    <div className="answer-nojourneys">
      <h1 className="answer-nojourneys-header__top">No active journeys</h1>
      <span className="answer-nojourneys-description">
        When you take a journey, you'll see your tasks here
      </span>
      <Link className="answer-nojourneys-btn" to={'discovery'}>
        Find a Journey
      </Link>
      <img src={imageNoJourneys} className="answer-nojourneys-img" alt="img" />
    </div>
  );
};

export default NoJourneys;
