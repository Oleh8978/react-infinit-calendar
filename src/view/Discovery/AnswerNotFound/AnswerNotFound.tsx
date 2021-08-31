import React, { useState, useEffect } from 'react';

// components
import { Link } from 'react-router-dom';

// static images
import imageAnswerNotFound from '../FakeData/notFound/answerNotFound.png';

// history 
import history from '@app/historyApi';

interface IProps {
  id: number;
}

const AnswerNotFound: React.FC<IProps> = ({...props}) => {
  return (
    <div className="answer-notfound">
      <h1 className="answer-notfound-header__top">
        Can't Find What You're Looking For?
      </h1>
      <span className="answer-notfound-description">
        Let us know! We will submit answer in the next post.
      </span>
      {/* <div > */}
      <div onClick={() => {history.push('/ask-question/'+props.id)}} className="answer-notfound-btn">
        <span className="answer-notfound-btn-text">Submit</span>
      </div>
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
