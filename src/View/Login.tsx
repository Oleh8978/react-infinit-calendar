import React from 'react';
import { connect } from 'react-redux';

// components
import Logo from 'Component/icon/Logo';
import FacebookLoginComponent from '../Component/Login/FacebookLogin';
import GoogleLoginComponent from '../Component/Login/GoogleLogin';
import LinkedinLoginComponent from '../Component/Login/LinkedinLogin';

// redux functionality
import { signIn } from '../Controller/auth/actions';

// interfaces
import { IStore } from '../Controller/model';
import Link from '../Routing/Link';
import PrivacyPolicy from '../Component/PrivacyPolicy';

interface IProps {
  signIn: ({ receivedToken, signIntype }) => void;
  status?: boolean;
}

const Login: React.FC<IProps> = ({ ...props }) => {
  const singInFunction = (data: any, type: string) => {
    console.log('data: ', data);
    console.log('type', type);
    props.signIn({ receivedToken: data.accessToken, signIntype: type });
  };

  return (
    <>
      <div className={'login'}>
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
      </div>
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
