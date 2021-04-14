import React from 'react';
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { facebookAppId, loginType } from 'Config';
import { ISignedData } from 'Controller/auth/model';
import FacebookIcon from 'Asset/icon/FacebookIcon';

type Props = {
  signIn: (state: ISignedData) => void;
};

const FacebookLoginComponent: React.FC<Props> = ({ signIn }) => {
  const handleResponse = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void => {
    if("status" in response) { return; }
    if("accessToken" in response){
      const fbLoginData: ISignedData = {
        type: "facebook",
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
      signIn(fbLoginData);
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
    >
      <FacebookIcon />
      <span>Continue with Facebook</span>
    </FacebookLogin>
  );
};

export default FacebookLoginComponent;
