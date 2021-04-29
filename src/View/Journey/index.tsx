import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {}

const Journey: React.FC<IProps> = () => {
  return <div className={'jorney'}>Joreny Page</div>;
};

export default Journey;
