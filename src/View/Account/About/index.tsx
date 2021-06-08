import React from 'react';

// components
import NavigationBar from 'Component/NavigationBar';
import BodyPage from './Body';

interface IProps {}

const AboutPage: React.FC<IProps> = () => {
  return (
    <div className={'aboutpage'}>
      <NavigationBar name={'About'} rout={'/settings'} />
      <BodyPage />
    </div>
  );
};

export default AboutPage;
