import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

// types
import { Pages } from '@app/routing/schema';

// components
import NavigationBar from '@app/component/NavigationBar';
import BodyEdditProfile from './BodyEdditProfile';
import Loader from '@app/component/Loader';

// action
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';
import { loginByTokenAction } from '@app/controller/auth/actions';

// interfaces
import { IUser } from '@app/controller/auth/model';
import { IStore } from '@app/controller/model';

interface IProps {}

const EdditProfile: React.FC<any> = ({ ...props }) => {
  // const [isSaveBtnActivState, setISSaveBtnActiveState] = useState<boolean>(
  //   false,
  // );
  const [isSaveBtnActivState, setISSaveBtnActiveState] = useState<boolean>(
    true,
  );
  const [userData, setUserData] = useState<IUser>(undefined);
  const [updater, setUpdater] = useState<boolean>(false);
  const dispatch = useDispatch();
  const settings: Pages = 'settings';

  const changeStateOfTheSvaeBtn = (value: boolean) => {
    setISSaveBtnActiveState(value);
  };

  const saveBtnFunctionality = () => {
    setUpdater(true);
    dispatch(props.updateUserDataAction(userData));
    setISSaveBtnActiveState(false);
  };
  return (
    <div className={'edditprofile'}>
      <NavigationBar
        name={'Edit Profile'}
        isEditProfile={true}
        page={settings}
        hasSaveButton={true}
        isSaveActive={true}
        isBtnSaveActive={isSaveBtnActivState}
        saveBtnFunctionality={saveBtnFunctionality}
      />
      <BodyEdditProfile
        isFirstpage={false}
        isEdditProfile={true}
        changeStateOfTheSvaeBtn={changeStateOfTheSvaeBtn}
        setUserData={setUserData}
        updater={updater}
        setUpdater={setUpdater}
      />
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    user: state.authState.user,
    loader: state.updateSteUserAfterSignIn.loaderState.status,
  }),
  { updateUserDataAction: updateUserDataAction.request, loginByTokenAction },
)(EdditProfile);
