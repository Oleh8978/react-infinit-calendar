import React from 'react';
import FacebookLoginComponent from '../Component/Login/FacebookLogin';
import { IStore } from '../Controller/model';
import { signIn } from '../Controller/auth/actions';
import { connect } from 'react-redux';
import { ISignedData } from '../Controller/auth/model';

interface IProps {
  signIn: (data: ISignedData) => void;
}

const Login: React.FC<IProps> = ({ signIn }) => {
  return (
    <div className={'login'}>
      <FacebookLoginComponent signIn={signIn} />
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