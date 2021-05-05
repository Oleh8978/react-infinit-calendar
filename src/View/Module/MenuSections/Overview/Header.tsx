import React, { useState } from 'react';

// static
import task from 'View/Account/static/tasks.png';

interface IProps {}

const Header: React.FC<IProps> = () => {
  return (
    <>
      <div className="overview-header">
        <img className="overview-header-img" src={task} alt="img" />
        <div className="overview-header-text">
          <span className="overview-header-text__top">Marketing</span>
          <span className="overview-header-text__bottom">
            Thinking About Plans for the Week
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
