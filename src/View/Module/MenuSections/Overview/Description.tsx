import React, { useState } from 'react';

interface IProps {}

const Description: React.FC<IProps> = () => {
  return (
    <>
      <div className="overview-body-description">
        <span className="overview-body-description-text">
          Running a business comes with considerable legal and{' '}
          <a href="#" className="overview-links">
            tax responsibilities,
          </a>{' '}
          including filing and payment deadlines.
        </span>
        <span className="overview-body-description-text">
          Make a list of all your bills:{' '}
          <strong>
            utilities, credit cards and your rent or mortgage payment.{' '}
          </strong>{' '}
          Include any other loan payments you have, too.
        </span>
      </div>
    </>
  );
};

export default Description;
