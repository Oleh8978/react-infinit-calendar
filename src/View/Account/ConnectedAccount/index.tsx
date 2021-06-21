import React from 'react';

// types
import { Pages } from 'routing/schema';

// components
import NavigationBar from 'component/NavigationBar';
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
