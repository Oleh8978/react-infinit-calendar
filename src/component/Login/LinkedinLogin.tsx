import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';

// Components
import LinkedInIcon from '@app/component/icon/LinkedInIcon';

// Interfaces
import { ISignedData } from '@app/controller/auth/model';

type Props = {
  signIn: (state: ISignedData, type: string) => void;
};

const LinkedinLoginComponent: React.FC<Props> = ({ signIn }) => {
  function handleResponse(response: any): void {
    console.log('response: ', response);
    if ('status' in response) {
      return;
    }
    if ('accessToken' in response) {
      const linkedinLoginData: ISignedData = {
        type: 'linkedin',
        accessToken: response.accessToken,
      };
      signIn(linkedinLoginData, 'linkedin');
    }
  }

  const handleError = (error: any): void => {
    console.error('linkedin login failed. \n', error);
  };

  return (
    <LinkedIn
      clientId="78mmxi4kx595wm"
      onFailure={handleError}
      onSuccess={handleResponse}
      redirectUri={`${window.location.origin}/linkedin`}
      scope={'r_emailaddress r_liteprofile'}
      renderElement={({ onClick, disabled }) => (
        <div className={'linked-inn-btn'}>
          <LinkedInIcon />
          <button
            className={'linked-inn-btn-main'}
            onClick={onClick}
            disabled={disabled}>
            <span className={'linked-inn-btn-main-txt'}>
              Continue with LinkedIn
            </span>
          </button>
        </div>
      )}
    />
  );
};

export default LinkedinLoginComponent;
