import React from 'react';

// components
import NavigationBar from '@app/component/NavigationBar';
import ConnectedAccountBody from './Body';

interface IProps {}

const ConnectedAccount: React.FC<IProps> = () => {
  // const settings: Pages = '/settings';
  return (
    <div className={'edditprofile-links'}>
      <NavigationBar name={'Connected accounts'} rout={'/settings'} />
      <ConnectedAccountBody />
    </div>
  );
};

export default ConnectedAccount;
