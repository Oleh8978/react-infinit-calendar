import React from 'react';
import FacebookLoginComponent from '../Component/Login/FacebookLogin';
import { IStore } from '../Controller/model';
import { signIn } from '../Controller/auth/actions';
import { connect } from 'react-redux';
import { ISignedData } from '../Controller/auth/model';
import GoogleLoginComponent from '../Component/Login/GoogleLogin';
import LinkedinLoginComponent from '../Component/Login/LinkedinLogin';

interface IProps {
  signIn: (data: ISignedData) => void;
}

const Login: React.FC<IProps> = ({ signIn }) => {
  const singInFunction = (data: any) => {
    console.log('data: ', data);
  };

  return (
    <div className={'login'}>
      <FacebookLoginComponent signIn={singInFunction} />
      <GoogleLoginComponent signIn={singInFunction} />
      <LinkedinLoginComponent signIn={singInFunction} />
    </div>
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
