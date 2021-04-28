import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Custom components
import Profile from './ProfileMain';

interface IProps extends RouteComponentProps {}

const Account: React.FC<IProps> = () => {
  return (
    <div className={'profile-wrapper'}>
      <Profile />
    </div>
  );
};

export default Account;
