import React from 'react';
// components
import SettingsBlock from '../Settings/SettingsBlock';

// static
import { About } from '../Settings/settingsConfig';

interface IProps {}

const BodyPage: React.FC<IProps> = () => {
  return (
    <div className={'aboutpage-links'}>
      <SettingsBlock
        data={About}
        isAboutPage={true}
        name={'Version'}
        version={process.env.REACT_APP_VERSION}
      />
    </div>
  );
};

export default BodyPage;
