import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';

// Components
import LinkedInIcon from '@app/component/icon/LinkedInIcon';

// Interfaces
import { ISignedData } from '@app/controller/auth/model';

type Props = {
  signIn: (state: ISignedData, type: string, uri: string) => void;
};

const LinkedinLoginComponent: React.FC<Props> = ({ signIn }) => {
  function handleResponse(response: any): void {
    if ('status' in response) {
      return;
    }
    if ('code' in response) {
      signIn(response.code, 'linkedIn', `${window.location.origin}/linkedin`);
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
