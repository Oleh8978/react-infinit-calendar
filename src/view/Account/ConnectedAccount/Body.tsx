import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import { LinkedIn } from 'react-linkedin-login-oauth2';
import ReactGoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// config files
import { facebookAppId } from '@app/config';
import { googleClientId } from '@app/config';

// // static
// import * as staticConfig from '../EditProfile/static';

// // components
// import ItemBody from './ItemBody';

// action
import { addLinkedSocialNetwork } from '@app/controller/auth/actions';
import { loginByTokenAction } from '@app/controller/auth/actions';

// utils functions
import { getSavedAccess } from '@app/utils/manageAccess';

// models
import { ISignedData } from '@app/controller/auth/model';
import { IStore } from '@app/controller/model';

interface IProps {
  linkedAccounts: string[];
}

const ConnectedAccountBody: React.FC<any> = ({ ...props }) => {
  const [socialMediaNetworks, setSocialMediaNetworks] = useState<string[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = getSavedAccess();
    if (props.linkedAccounts !== undefined) {
      setSocialMediaNetworks(props.linkedAccounts);
    } else {
      props.loginByTokenAction(authData);
    }
  }, [props.linkedAccounts]);

  console.log('socialMediaNetworks ', socialMediaNetworks);
  console.log('props.linkedAccounts ', props.linkedAccounts)
  const onResponseGoogle = (response: any) => {
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
      dispatch(
        addLinkedSocialNetwork.request({
          receivedToken: getSavedAccess().accessToken,
          socialMediaNetworkType: 'google',
          socialNetworkToken: response.accessToken,
          redirectURL: ``,
        }),
      );
      props.loginByTokenAction(getSavedAccess());
    }
  };

  const handleResponseFaceBook = (
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
      dispatch(
        addLinkedSocialNetwork.request({
          receivedToken: getSavedAccess().accessToken,
          socialMediaNetworkType: 'facebook',
          socialNetworkToken: response.accessToken,
          redirectURL: ``,
        }),
      );
      props.loginByTokenAction(getSavedAccess());
    }
  };

  const handleErrorFacebook = (error: ReactFacebookFailureResponse): void => {
    console.error('facebook login failed. \n', error);
  };

  function handleResponseLinkedIn(response: any): void {
    console.log('response ', response);
    if ('status' in response) {
      return;
    }
    if ('code' in response) {
      dispatch(
        addLinkedSocialNetwork.request({
          receivedToken: getSavedAccess().accessToken,
          socialMediaNetworkType: 'linkedIn',
          socialNetworkToken: response.code,
          redirectURL: `${window.location.origin}/linkedin`,
        }),
      );
      props.loginByTokenAction(getSavedAccess());
    }
  }

  const handleErrorLinkedIn = (error: any): void => {
    console.error('linkedin login failed. \n', error);
  };

  return (
    <>
      {socialMediaNetworks && (
        <div className={'edditprofile-links-body'}>
          <>
            <div className={'edditprofile-links-body-item'}>
              <div className="edditprofile-links-body-item-wrapper">
                <div className="edditprofile-links-body-item-wrapper__name">
                  Google
                </div>
                <div className="edditprofile-links-body-item-wrapper__btn">
                  <div
                    className={
                      socialMediaNetworks.filter((item) => item === 'google')
                        .length === 0
                        ? 'edditprofile-links-body-item-wrapper__btn-wrapper'
                        : 'edditprofile-links-body-item-wrapper__btn-unlink'
                    }>
                    <>
                      {socialMediaNetworks.filter((item) => item === 'google')
                        .length === 0 ? (
                        <ReactGoogleLogin
                          clientId={googleClientId}
                          render={(renderProps) => (
                            <span
                              onClick={renderProps.onClick}
                              className={
                                'edditprofile-links-body-item-wrapper__btn-wrapper-txt'
                              }>
                              Link
                            </span>
                          )}
                          buttonText="Login"
                          onSuccess={onResponseGoogle}
                          onFailure={onResponseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                      ) : (
                        <>Unlik</>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </>
          <>
            <div className={'edditprofile-links-body-item'}>
              <div className="edditprofile-links-body-item-wrapper">
                <div className="edditprofile-links-body-item-wrapper__name">
                  Facebook
                </div>
                <div className="edditprofile-links-body-item-wrapper__btn">
                  <div
                    className={
                      socialMediaNetworks.filter((item) => item === 'facebook')
                        .length === 0
                        ? 'edditprofile-links-body-item-wrapper__btn-wrapper'
                        : 'edditprofile-links-body-item-wrapper__btn-unlink'
                    }>
                    <>
                      {socialMediaNetworks.filter((item) => item === 'facebook')
                        .length === 0 ? (
                        <FacebookLogin
                          appId={facebookAppId}
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={handleResponseFaceBook}
                          onFailure={handleErrorFacebook}
                          render={(renderProps) => (
                            <span
                              onClick={renderProps.onClick}
                              className={
                                'edditprofile-links-body-item-wrapper__btn-wrapper-txt'
                              }>
                              Link
                            </span>
                          )}
                        />
                      ) : (
                        <> Unlink </>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </>
          <>
            <div className={'edditprofile-links-body-item'}>
              <div className="edditprofile-links-body-item-wrapper">
                <div className="edditprofile-links-body-item-wrapper__name">
                  LinkedIn
                </div>
                <div className="edditprofile-links-body-item-wrapper__btn">
                  <div
                    className={
                      socialMediaNetworks.filter((item) => item === 'linkedIn')
                        .length === 0
                        ? 'edditprofile-links-body-item-wrapper__btn-wrapper'
                        : 'edditprofile-links-body-item-wrapper__btn-unlink'
                    }>
                    <>
                      {socialMediaNetworks.filter((item) => item === 'linkedIn')
                        .length === 0 ? (
                        <LinkedIn
                          clientId="78mmxi4kx595wm"
                          onFailure={handleErrorLinkedIn}
                          onSuccess={handleResponseLinkedIn}
                          redirectUri={`${window.location.origin}/linkedin`}
                          scope={'r_emailaddress r_liteprofile'}
                          renderElement={({ onClick, disabled }) => (
                            <span
                              onClick={onClick}
                              className={
                                'edditprofile-links-body-item-wrapper__btn-wrapper-txt'
                              }>
                              Link
                            </span>
                          )}
                        />
                      ) : (
                        <>Unlink</>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    linkedAccounts: state.authState.user.userAuthorizations,
    user: state.authState.user,
  }),
  { loginByTokenAction },
)(ConnectedAccountBody);
