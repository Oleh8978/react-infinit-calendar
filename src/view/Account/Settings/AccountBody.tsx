import React from 'react';

// hardcoded
import face from '../static/fakeFace.png';
import pen from './static/pen.png';

interface IProps {}

const AccountBody: React.FC<IProps> = () => {
  return (
    <div className={'settings-body'}>
      <div className="settings-body-account">
        <div className="settings-body-account-imgs">
          <img
            src={face}
            className="settings-body-account-imgs-face"
            alt="img"
          />
          <div className="settings-body-account-imgs-smallWrapper">
            <img
              className="settings-body-account-imgs-pen"
              src={pen}
              alt="img"
            />
          </div>
        </div>
        <div className="settings-body-account-names">
          <span className="settings-body-account-names-name">Jhon Pedersen</span>
        </div>
      </div>
    </div>
  );
};

export default AccountBody;
