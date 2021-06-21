import React from 'react';
import ReactGoogleLogin from 'react-google-login';
// components 
import GoogleIcon from 'component/icon/GoogleIcon';
// interfaces 
import { ISignedData } from 'controller/auth/model';
// config files 
import { googleClientId } from 'config';

type Props = {
  signIn: (state: ISignedData, type: string) => void;
};

const GoogleLoginComponent: React.FC<Props> = ({ signIn }) => {
  const onResponse = (response: any) => {
    console.log('response: ', response);
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
      signIn(signedData, 'google');
    }
  };

  return (
    <ReactGoogleLogin
      clientId={googleClientId}
      render={(renderProps) => (
        <button
          className="auth__google-button"
          disabled={renderProps.disabled}
          onClick={renderProps.onClick}>
          <GoogleIcon />
          <span className={'auth__google-button-txt'}>Continue with Google</span>
        </button>
      )}
      buttonText="Login"
      onSuccess={onResponse}
      onFailure={onResponse}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
