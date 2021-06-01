import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import { ISignedData } from 'Controller/auth/model';

type Props = {
  signIn: (state: ISignedData) => void;
};

const LinkedinLoginComponent: React.FC<Props> = ({ signIn }) => {
  function handleResponse (response: any): void {
    console.log('response: ', response);
    if("status" in response) { return; }
    if("accessToken" in response){
      const linkedinLoginData: ISignedData = {
        type: 'linkedin',
        accessToken: response.accessToken,
      };
      signIn(linkedinLoginData);
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
        <button onClick={onClick} disabled={disabled}>
          Custom linkedin element
        </button>
      )}
    />
  );
};

export default LinkedinLoginComponent;
