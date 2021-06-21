import React, { useState, useEffect } from 'react';

// components
import Link from '@app/routing/Link';

// static images
import imageAnswerNotFound from '../FakeData/notFound/answerNotFound.png';

interface IProps {}

const AnswerNotFound: React.FC<IProps> = () => {
  return (
    <div className="answer-notfound">
      <h1 className="answer-notfound-header__top">
        Can't Find What You're Looking For?
      </h1>
      <span className="answer-notfound-description">
        Let us know! We will submit answer in the next post.
      </span>
      {/* <div > */}
      <Link to={'ask-question'} className="answer-notfound-btn">
        <span className="answer-notfound-btn-text">Submit</span>
      </Link>
      {/* </div> */}
      <img
        src={imageAnswerNotFound}
        className="answer-notfound-img"
        alt="img"
      />
    </div>
  );
};

export default AnswerNotFound;
