import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import SettingsBlock from './SettingsBlock';
import LogOut from './ButtonTypes/LogOut';
import Loader from '@app/component/Loader';

// interfaces
import { StaticPageDTO } from '@ternala/frasier-types';
import { IStore } from '@app/controller/model';

// settings
import * as settingsConfig from './settingsConfig';

// utils functions
import { clearAccess } from '@app/utils/manageAccess';

// actions
import { setAuthenticatedStatus, logOut } from '@app/controller/auth/actions';
import { staticPagesList } from '@app/controller/staticPage/actions';
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';

interface IProps {
  listOfStaticPages: StaticPageDTO;
}

const SettingsBody: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();
  const logoutMethod = () => {
    dispatch(setAuthenticatedStatus({ status: false }));
    dispatch(logOut.request({}));
    dispatch(
      updateUserDataAction.success({
        user: 0,
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        image: '',
      }),
    );
    clearAccess();
  };

  useEffect(() => {
    if (props.listOfStaticPages === undefined) {
      dispatch(staticPagesList.request({}));
    }
  }, [props.listOfStaticPages]);

  console.log('props.listOfStaticPages ', props.listOfStaticPages);

  return (
    <div className={'settings-main'}>
      {props.loaderGeneral ? (
        <Loader />
      ) : (
        <>
          <SettingsBlock data={settingsConfig.Account} />
          <SettingsBlock data={settingsConfig.notifications} />
          <SettingsBlock data={settingsConfig.More} />
          <LogOut logoutMethod={logoutMethod} />
        </>
      )}
    </div>
  );
};

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
    listOfStaticPages: state.staticPagesListReducer.state.items,
    loaderGeneral: state.staticPagesListReducer.loaderState.status,
  }),
  {
    setAuthenticatedStatus,
  },
)(SettingsBody);
