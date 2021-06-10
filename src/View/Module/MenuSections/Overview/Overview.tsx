import React, { useState } from 'react';

// components
import Header from './Header';
import Body from "./Body";

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
