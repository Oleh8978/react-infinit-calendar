import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import EdditProfileBodyComponent from './EditProfileComponents/EditProfileItemBody';
import DeletePageBTN from '@app/component/DeletePageBTN';

// interfaces
import { IStore } from '@app/controller/model';
import { IUser } from '@app/controller/auth/model';
import { IvalidatorState } from '../../LoginPages/utils/models';
import { IFullObjectState, IboolState } from './Models';

// actions
import { loginByTokenAction, deleteProfile } from 'Controller/auth/actions';
import { updateUserDataAction } from 'Controller/secondStepDataUpdater/actions';

// data schema
import * as editList from './static';

// constnats
import { validation } from '../../LoginPages/utils/validation';
import { editProfileState, editProfileStateEquality } from './utils/constnats';

// helpers
import { getSavedAccess } from 'utils/manageAccess';

interface IProps {
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
  isEdditProfile?: boolean;
}

const BodyEdditProfile: React.FC<any> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUser>(undefined);
  const [validationObject, setValidationObject] = useState<IvalidatorState[]>(
    validation,
  );
  const [
    isAllSiealdsArefiledOut,
    setIsAllSiealdsArefiledOut,
  ] = useState<boolean>(false);
  const [
    editProfileStateObject,
    setEditProfileStateObject,
  ] = useState<IFullObjectState>(editProfileState);
  const dispatch = useDispatch();

  const validatorFunctionality = (key: string, value: string) => {
    const element = validationObject.find((item) => item.name === key);
    if (element !== undefined) {
      validationObject[validationObject.indexOf(element)].value = value;
      if (value.trim().length !== 0) {
        validationObject[validationObject.indexOf(element)].isValid = true;
      } else {
        validationObject[validationObject.indexOf(element)].isValid = false;
      }
      setValidationObject(validationObject);
      setValidity();
    }
    updateUserData();
  };

  const setValidity = () => {
    const anyInvalid = validationObject.find((item) => item.isValid === false);
    if (anyInvalid === undefined) {
      setIsAllSiealdsArefiledOut(true);
    } else {
      setIsAllSiealdsArefiledOut(false);
    }
  };

  const updateUserData = () => {
    if (isAllSiealdsArefiledOut && userData !== undefined) {
      props.setUserData({
        firstName: editProfileStateObject.firstName,
        lastName: editProfileStateObject.lastName,
        image: editProfileStateObject.image,
        email: editProfileStateObject.email,
        phone: editProfileStateObject.phone,
        timezone: editProfileStateObject.timezone,
        startTime: Number(editProfileStateObject.startTime),
        id: userData.id,
      });
    }
  };

  const setObjectState = (key: string, value: string) => {
    for (const [keyEditProf, valueEditProf] of Object.entries(
      editProfileStateObject,
    )) {
      if (key === keyEditProf) {
        editProfileStateObject[keyEditProf] = value;
      }
    }

    setEditProfileStateObject(editProfileStateObject);
  };

  useEffect(() => {
    if (userData === undefined && props.user.userData !== undefined) {
      setUserData(props.user.userData);
      for (const [keyUser, valueUser] of Object.entries(props.user.userData)) {
        for (const [keyEditProf, valueEditProf] of Object.entries(
          editProfileStateObject,
        )) {
          if (keyUser === keyEditProf) {
            editProfileStateObject[keyEditProf] = valueUser;
          }
        }
      }
      setEditProfileStateObject(editProfileStateObject);
    }

    if (props.updater === true) {
      props.setUpdater(false);
      dispatch(
        loginByTokenAction({
          accessToken: getSavedAccess().refreshToken,
          refreshToken: getSavedAccess().refreshToken,
        }),
      );
      console.log('inn');
    }
  }, [props.user.id, props.updater]);

  const observer = () => {
    const array = [];
    Object.entries(editProfileStateObject).map((elem) => {
      array.push({
        name: elem[0],
        status: true,
      });
    });
    Object.entries(editProfileStateObject).map((item) => {
      Object.entries(props.user.userData).map((elem) => {
        if (elem[0] === item[0] && elem[1] !== item[1]) {
          array.map((itemA) => {
            if (itemA.name === elem[0]) {
              array[array.indexOf(itemA)].status = false;
            }
          });
        } else if (elem[0] === item[0] && elem[1] === item[1]) {
          array.map((itemA) => {
            if (itemA.name === elem[0]) {
              array[array.indexOf(itemA)].status = true;
            }
          });
        }
      });
    });
    if (array.filter((item) => item.status === false).length !== 0) {
      props.changeStateOfTheSvaeBtn(true);
    } else {
      props.changeStateOfTheSvaeBtn(false);
    }
  };

  const deleteProfile = () => {
    console.log('deleted');
    props.deleteProfile({});
  };

  return (
    <>
      {props.isEdditProfile ? (
        <div className={'edditprofile-body'}>
          <EdditProfileBodyComponent
            data={editList.PersonalInfo}
            isFirstpage={props.isFirstpage}
            user={props.user}
            validatorFunctionality={validatorFunctionality}
            setObjectState={setObjectState}
            observer={observer}
          />
          {props.isFirstpage ? (
            <></>
          ) : (
            <EdditProfileBodyComponent
              data={editList.BillingAddress}
              isFirstpage={props.isFirstpage}
              setObjectState={setObjectState}
              observer={observer}
            />
          )}
          <EdditProfileBodyComponent
            data={editList.TimingSettings}
            timeZones={editList.aryIannaTimeZones}
            user={props.user}
            validatorFunctionality={validatorFunctionality}
            setObjectState={setObjectState}
            isFirstpage={props.isFirstpage}
            observer={observer}
          />
          {props.isFirstpage ? (
            <></>
          ) : (
            <>
              <DeletePageBTN
                text={'Delete account'}
                eventHandler={deleteProfile}
                classes={' delete-btn-eddit-profile'}
              />
            </>
          )}
        </div>
      ) : (
        <div className={'edditprofile-body'}>
          <EdditProfileBodyComponent
            data={editList.PersonalInfo}
            isFirstpage={props.isFirstpage}
            user={props.user}
            validatorFunctionality={props.validatorFunctionality}
          />
          {props.isFirstpage ? (
            <></>
          ) : (
            <EdditProfileBodyComponent
              data={editList.BillingAddress}
              isFirstpage={props.isFirstpage}
            />
          )}
          <EdditProfileBodyComponent
            data={editList.TimingSettings}
            timeZones={editList.aryIannaTimeZones}
            user={props.user}
            validatorFunctionality={props.validatorFunctionality}
          />
          {props.isFirstpage ? (
            <></>
          ) : (
            <>
              <DeletePageBTN
                text={'Delete account'}
                eventHandler={deleteProfile}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    user: state.authState.user,
  }),
  {
    loginByTokenAction,
    deleteProfile: deleteProfile.request,
    updateUserDataAction: updateUserDataAction.request,
  },
)(BodyEdditProfile);
