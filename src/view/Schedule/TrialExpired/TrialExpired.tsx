import React, { useState, useEffect } from 'react';

interface IProps {}

const TrialExpired: React.FC<IProps> = () => {
  return (
    <div className="answer-trialexpired">
      <h1 className="answer-trialexpired-header__top">
        Your trial has expired
      </h1>
      <span className="answer-trialexpired-description">
        Please purchase this journey in order to be able to access it.
      </span>
      <span className="answer-trialexpired-icon">👇</span>
      <div className="answer-trialexpired-btn">Go to Journey</div>
    </div>
  );
};

export default TrialExpired;
