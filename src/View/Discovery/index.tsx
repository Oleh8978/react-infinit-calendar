import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {}

const Discovery: React.FC<IProps> = () => {
  return <div className={'discovery'}>This is discovery page</div>;
}

export default Discovery