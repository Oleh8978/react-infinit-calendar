import React from 'react';
import ReactGoogleLogin from 'react-google-login';
import GoogleIcon from 'Asset/icon/GoogleIcon';
import { ISignedData } from 'Controller/auth/model';
import { googleClientId } from 'Config';

type Props = {
  signIn: (state: ISignedData) => void;
};

const GoogleLogin: React.FC<Props> = ({ signIn }) => {
  const onResponse = (response: any) => {
    let signedData: ISignedData = { type: 'google' };
    if (!response.error) {
      if (response.profileObj) {
        const {
          email,
          familyName,
          givenName,
          imageUrl,
          googleId,
        } = response.profileObj;
        signedData = {
          id: googleId,
          firstName: givenName,
          lastName: familyName,
          image: imageUrl,
          email: email,
          type: signedData.type,
          accessToken: response.accessToken,
        };
      }
      signIn(signedData);
    }
  };

  return (
    <ReactGoogleLogin
      clientId={googleClientId}
      render={(renderProps) => (
        <button
          className="auth__google-button auth__btn"
          disabled={renderProps.disabled}
          onClick={renderProps.onClick}>
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      )}
      buttonText="Login"
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLogin;
