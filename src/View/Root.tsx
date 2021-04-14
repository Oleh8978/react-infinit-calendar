import React from 'react';
import Routing from '../Routing';

interface IProps {}

const Root: React.FC<IProps> = () => {
  return (
    <main className={'main-layout'}>
      <Routing />
    </main>
  );
};

export default Root;
