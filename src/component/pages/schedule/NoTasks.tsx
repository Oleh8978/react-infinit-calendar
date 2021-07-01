import React from 'react';

// static images
import imageNoTasks from '@app/asset/images/noTasks.png';

interface IProps {}

const NoTasks: React.FC<IProps> = () => {
  return (
    <div className="answer-notasks">
      <h1 className="answer-notasks-header__top">No Tasks HERE</h1>
      <span className="answer-notasks-description">Enjoy your day!</span>
      <img src={imageNoTasks} className="answer-notasks-img" alt="img" />
    </div>
  );
};

export default NoTasks;
