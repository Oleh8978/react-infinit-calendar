import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// components
import Logo from '@app/component/icon/Logo';
import FacebookLoginComponent from '@app/component/Login/FacebookLogin';
import GoogleLoginComponent from '@app/component/Login/GoogleLogin';
import LinkedinLoginComponent from '@app/component/Login/LinkedinLogin';
import AddYourData from './LoginPages/AddYourData';

// redux functionality
import { signIn } from '@app/controller/auth/actions';

// interfaces
import { IStore } from '@app/controller/model';
import { IUser } from '@app/controller/auth/model';
import Link from '@app/routing/Link';

interface IProps {
  authStatus: boolean;
  isNeededSecondStep: boolean;
  signIn: ({ receivedToken, signIntype, redirectUri }) => void;
  logoutMethod: () => void;
  user?: IUser;
  setPageOpened: () => void;
}

const Login: React.FC<IProps> = ({ ...props }) => {
  const singInFunction = (data: any, type: string, redirectUri?: string) => {
    type === 'linkedIn'
      ? props.signIn({
          receivedToken: data,
          signIntype: type,
          redirectUri: redirectUri,
        })
      : props.signIn({
          receivedToken: data.accessToken,
          signIntype: type,
          redirectUri: '',
        });
  };

  return (
    <>
      {(!props.isNeededSecondStep && !props.authStatus) ||
      (props.isNeededSecondStep && !props.authStatus) ? (
        <>
          <Scrollbars
            style={{
              width: '100%',
              maxWidth: 860,
              height: '100%',
              maxHeight: '100%',
              display: 'flex',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
            renderView={(props) => <div {...props} className={'login'} />}>
            <div className={'login-header'}>
              <Logo className={'logo'} />
            </div>
            <div className={'login-body'}>
              <div className={'login-body-header'}>
                <span className={'login-body-header__top'}>Welcome!</span>
                <span className={'login-body-header__bottom'}>
                  Run your own business with us
                </span>
              </div>
              <div className={'login-body-main'}>
                <div className={'login-body-main-item'}>
                  <GoogleLoginComponent signIn={singInFunction} />
                </div>
                <div className={'login-body-main-item'}>
                  <LinkedinLoginComponent signIn={singInFunction} />
                </div>
                <div className={'login-body-main-item'}>
                  <FacebookLoginComponent signIn={singInFunction} />
                </div>
              </div>
              <div className={'login-body-footer'}>
                <span className={'login-body-footer-text'}>
                  By continuing you agree with our{' '}
                  <Link to={'terms'} className={'login-body-footer-text-link'}>
                    terms
                  </Link>{' '}
                  and{' '}
                  <Link
                    to={'privacy-policy'}
                    className={'login-body-footer-text-link'}>
                    privacy policy
                  </Link>
                </span>
              </div>
            </div>
          </Scrollbars>
        </>
      ) : (
        <>
          {props.isNeededSecondStep ? (
            <AddYourData
              user={props.user}
              logoutMethod={props.logoutMethod}
              setPageOpened={props.setPageOpened}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    authStatus: !!state.authState.isAuthenticated,
    location: state.router.location,
  }),
  {
    signIn: signIn.request,
  },
)(Login);
