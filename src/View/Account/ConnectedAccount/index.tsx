import React from 'react';

// types
import { Pages } from 'Routing/schema';

// components
import NavigationBar from 'Component/NavigationBar';
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
