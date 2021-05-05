import React, { useState } from 'react';

// components
import Header from './Header';
import Body from "./Body";

// static
import task from 'View/Account/static/tasks.png';

// hardcoded
import talks from './staticHardcoded/talks.png';

interface IProps {}

const Overview: React.FC<IProps> = () => {
  return (
    <div className={'overview'}>
      <Header />
      <Body />
    </div>
  );
};

export default Overview;
