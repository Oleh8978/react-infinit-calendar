import React, { useState, useEffect } from 'react';

interface IProps {}

const MyJourneys: React.FC<IProps> = () => {
  return (
    <div className={'profile-myjourneys'}>
      <span className={'profile-myjourneys-header'}>My journeys </span>
      <div className={'profile-myjourneys-wrapper'}>
        here is the list and map method
      </div>
    </div>
  );
};

export default MyJourneys;
