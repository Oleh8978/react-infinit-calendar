import React from 'react';

// components
import SettingsBlock from './SettingsBlock';
import LogOut from './ButtonTypes/LogOut';

// interfaces
import { ISetting, ISettingElem } from './Models';

// settings
import * as settingsConfig from './settingsConfig';

interface IProps {}

const SettingsBody: React.FC<IProps> = () => {
  return (
    <div className={'settings-main'}>
      <SettingsBlock data={settingsConfig.Account} />
      <SettingsBlock data={settingsConfig.notifications} />
      <SettingsBlock data={settingsConfig.More} />
      <LogOut />
    </div>
  );
};

export default SettingsBody;
