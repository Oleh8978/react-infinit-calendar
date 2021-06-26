import React from 'react';
import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// components
import FacebookIcon from '@app/component/icon/FacebookIcon';

// interfaces
import { ISignedData } from '@app/controller/auth/model';

// config files
import { facebookAppId } from '@app/config';

type Props = {
  signIn: (state: ISignedData, type: string) => void;
};

const FacebookLoginComponent: React.FC<Props> = ({ signIn }) => {
  const handleResponse = (
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ): void => {
    console.log('response: ', response);
    if ('status' in response) {
      return;
    }
    if ('accessToken' in response) {
      const fbLoginData: ISignedData = {
        type: 'facebook',
        id: response.userID,
        firstName: response.name,
        accessToken: response.accessToken,
      };
      if (response.email) {
        fbLoginData.email = response.email;
      }
      if (response.picture?.data.url) {
        fbLoginData.image = response.picture.data.url;
      }
      signIn(fbLoginData, 'facebook');
    }
  };

  const handleError = (error: ReactFacebookFailureResponse): void => {
    console.error('facebook login failed. \n', error);
  };

  return (
    <FacebookLogin
      appId={facebookAppId}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleResponse}
      onFailure={handleError}
      render={(renderProps) => (
        <div className={'facebook-btn-body'} onClick={renderProps.onClick}>
          <FacebookIcon />
          <span className={'facebook-btn-body-txt'}>
            Continue with Facebook
          </span>
        </div>
      )}
    />
  );
};

export default FacebookLoginComponent;
