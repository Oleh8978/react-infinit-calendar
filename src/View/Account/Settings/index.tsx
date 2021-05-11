import React from 'react';

// components
import NavigationBar from 'Component/NavigationBar';
import AccountBody from './AccountBody';
import SettingsBody from './SettingsBody';

interface IProps {}

const Settings: React.FC<IProps> = () => {
  return (
    <div className={'settings'}>
      <NavigationBar rout={'account'} name={'Settings'} />
      <AccountBody />
      <SettingsBody />
    </div>
  );
};

export default Settings;
