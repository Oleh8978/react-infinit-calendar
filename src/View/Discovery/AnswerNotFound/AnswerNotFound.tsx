import React, { useState, useEffect } from 'react';

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
      <div className="answer-notfound-btn">Submit</div>
      <img
        src={imageAnswerNotFound}
        className="answer-notfound-img"
        alt="img"
      />
    </div>
  );
};

export default AnswerNotFound;
