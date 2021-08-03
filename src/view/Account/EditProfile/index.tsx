import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// types
import { Pages } from '@app/routing/schema';

// components
import NavigationBar from '@app/component/NavigationBar';
import BodyEdditProfile from './BodyEdditProfile';

// action
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';
import { loginByTokenAction } from '@app/controller/auth/actions';
import { setSaveBTNStatus } from '@app/controller/saveBTN/actions'

// interfaces
import { IUser } from '@app/controller/auth/model';
import { IStore } from '@app/controller/model';

// constnats
import { validation } from '../../LoginPages/utils/validation';

interface IProps {}

const EdditProfile: React.FC<any> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUser>(undefined);
  const [updater, setUpdater] = useState<boolean>(false);
  const [validationState, setValidationState] = useState<any>([]);
  const dispatch = useDispatch();
  const settings: Pages = 'settings';

  const changeStateOfTheSvaeBtn = (value: boolean) => {
    dispatch(setSaveBTNStatus({isActive: value}))
  };
  console.log('validation state ', validationState);
  console.log('user data ', userData);
  console.log('props user data ', props.user);

  useEffect(() => {
    const newValidation = [];
    if (props.user && props.user.userData) {
      validation.map((item) => {
        if (
          String(props.user.userData[item.name]) === 'null' ||
          String(props.user.userData[item.name]).trim().length === 0
        ) {
          newValidation.push({
            name: item.name,
            value: '',
            isValid: false,
            hasAnyError: true,
          });
        } else {
          newValidation.push({
            name: item.name,
            value: props.user.userData[item.name],
            isValid: true,
            hasAnyError: false,
          });
        }
      });
      setValidationState(newValidation);
    }
  }, []);
  const validationStateFunction = (objArr: any[]) => {
    setValidationState(objArr);
  };

  const saveBtnFunctionality = () => {
    const validationObjectUpdate = [...validationState];
    validationObjectUpdate.map((item) => {
      if (item.name === 'phone') {
        if (
          validationObjectUpdate[validationState.indexOf(item)].value.trim()
            .length === 14
        ) {
          validationObjectUpdate[validationState.indexOf(item)].isValid = true;
        } else {
          validationObjectUpdate[validationState.indexOf(item)].isValid = false;
        }
      } else if (item.name === 'email') {
        if (
          validationObjectUpdate[validationState.indexOf(item)].value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
        ) {
          validationObjectUpdate[validationState.indexOf(item)].isValid = true;
        } else {
          validationObjectUpdate[validationState.indexOf(item)].isValid = false;
        }
        setValidationState(validationObjectUpdate);
      }
    });

    if (
      validationObjectUpdate
        .filter((item) => item.name === 'phone' || item.name === 'email')
        .filter((item) => item.isValid !== false).length === 2
    ) {
      if (userData !== undefined) {
        setUpdater(true);
        dispatch(props.updateUserDataAction(userData));
        dispatch(setSaveBTNStatus({isActive: false}))
      }
    }
  };

  return (
    <div className={'edditprofile'}>
      <NavigationBar
        name={'Edit Profile'}
        isEditProfile={true}
        page={settings}
        hasSaveButton={true}
        isSaveActive={true}
        saveBtnFunctionality={saveBtnFunctionality}
      />
      <BodyEdditProfile
        isFirstpage={false}
        isEdditProfile={true}
        changeStateOfTheSvaeBtn={changeStateOfTheSvaeBtn}
        validationStateSetter={validationStateFunction}
        setUserData={setUserData}
        updater={updater}
        setUpdater={setUpdater}
        validationState={validationState}
      />
    </div>
  );
};

export default connect(
  (state: IStore) => ({
    user: state.authState.user,
    loader: state.updateSteUserAfterSignIn.loaderState.status,
  }),
  { updateUserDataAction: updateUserDataAction.request, loginByTokenAction, setSaveBTNStatus },
)(EdditProfile);
