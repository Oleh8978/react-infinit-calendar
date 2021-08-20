import React from 'react';
import imageBottom from './static/bottom.png';
import imageLogo from './static/Logo.png';

interface IProps {}

const SplashScreen: React.FC<IProps> = ({ ...props }) => {
  return (
    <div
      className="pwa">
      <div className="pwa-logo-center">
        {/* <svg width="295" height="80" viewBox="0 0 252 110" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
        <img alt="img" src={imageLogo} className="pwa-logo-center-img" />
      </div>
      <div className="pwa-logo-bottom">
        <img alt="img" src={imageBottom} className="pwa-logo-bottom-img" />
      </div>
    </div>
  );
};

export default SplashScreen;
