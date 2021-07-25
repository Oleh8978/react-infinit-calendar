import React from 'react';
import Link from '@app/routing/Link';

interface IProps {
  id: number;
}

const TrialExpired: React.FC<IProps> = ({ id }) => {
  return (
    <div className="answer-trialexpired">
      <h1 className="answer-trialexpired-header__top">
        Your trial has expired
      </h1>
      <span className="answer-trialexpired-description">
        Please purchase this journey in order to be able to access it.
      </span>
      <span className="answer-trialexpired-icon">👇</span>
      <Link
        className="answer-trialexpired-btn"
        to={'journey'}
        params={{ id: String(id) }}>
        Go to Journey
      </Link>
    </div>
  );
};

export default TrialExpired;
