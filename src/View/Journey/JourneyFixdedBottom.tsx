import React, { useEffect, useState } from 'react';

interface IProps {}

const JourneyFixedBottom: React.FC<IProps> = () => {
  return (
    <div className="jorneydiscoveymain-bottom">
      <div className="jorneydiscoveymain-bottom-pink">
        <span className="jorneydiscoveymain-bottom-pink-text">
          Start 17-Day Trial Version
        </span>
      </div>
      <div className="jorneydiscoveymain-bottom-pink-full">
        <span className="jorneydiscoveymain-bottom-pink-full-text">
          Purchase Full Journey for Only
        </span>{' '}
        <span className="jorneydiscoveymain-bottom-pink-full-text-price">
        {' '}$4.99
        </span>
      </div>
    </div>
  );
};

export default JourneyFixedBottom;
