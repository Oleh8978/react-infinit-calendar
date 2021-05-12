import React from 'react';

interface IProps {}

const LogOut: React.FC<IProps> = () => {
  return (
    <div className={'log-out'}>
      <span className={'log-out-btn'}>Log out</span>
    </div>
  );
};

export default LogOut;
