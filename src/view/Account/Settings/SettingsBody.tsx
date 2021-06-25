import React from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import SettingsBlock from './SettingsBlock';
import LogOut from './ButtonTypes/LogOut';
import Loader from '@app/component/Loader';

// interfaces
import { IStore } from '@app/controller/model';

// settings
import * as settingsConfig from './settingsConfig';

// utils functions
import { clearAccess } from '@app/utils/manageAccess';

// actions
import {
  setAuthenticatedStatus,
  logOut,
} from '@app/controller/auth/actions';

interface IProps {}

const SettingsBody: React.FC<IProps> = ({ ...props }) => {
  const dispatch = useDispatch();
  const logoutMethod = () => {
    dispatch(setAuthenticatedStatus({ status: false }));
    dispatch(logOut.request({}));
    clearAccess();
  };

  return (
    <div className={'settings-main'}>
      <SettingsBlock data={settingsConfig.Account} />
      <SettingsBlock data={settingsConfig.notifications} />
      <SettingsBlock data={settingsConfig.More} />
      <LogOut logoutMethod={logoutMethod} />
    </div>
  );
};

// export default SettingsBody;

export default connect(
  (state: IStore) => ({
    authStatus: state.authState.isAuthenticated,
    location: state.router.location,
    loader: state.authState.state.isLoading,
    isNeededSecondStep: state.authState.user.isNeedSecondStep,
    isSecondStepPassed: state.updateSteUserAfterSignIn.isSecondStepPassed,
    user: state.authState.user,
    userData: state.userReducer.user.userData,
    userDataLoader: state.userReducer.isLoading.status,
  }),
  {
    setAuthenticatedStatus,
  },
)(SettingsBody);
