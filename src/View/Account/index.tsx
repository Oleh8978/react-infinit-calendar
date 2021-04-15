import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {}

const Account: React.FC<IProps> = () => {
  return <div className={'account'}>This is account page</div>;
};

export default Account;
