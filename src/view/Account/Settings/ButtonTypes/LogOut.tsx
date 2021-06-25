import React from 'react';

interface IProps {
  logoutMethod: () => void;
}

const LogOut: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className={'log-out'} onClick={() => props.logoutMethod()}>
      <span className={'log-out-btn'}>Log out</span>
    </div>
  );
};

export default LogOut;
