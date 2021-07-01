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
import {
  loginByTokenAction,
  deleteProfile,
} from '@app/controller/auth/actions';
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';

// data schema
import * as editList from './static';

// constnats
import { validation } from '../../LoginPages/utils/validation';
import { editProfileState, editProfileStateEquality } from './utils/constnats';

// helpers
import { getSavedAccess } from '@app/utils/manageAccess';

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
  const [timeZone, setTimeZone] = useState<string>('');
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
        street: editProfileStateObject.street,
        zipCode: editProfileStateObject.zipCode,
        city: editProfileStateObject.city,
        state: editProfileStateObject.state,
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
    setTimeZone(value);
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
    }
    if (props.changeStateOfTheSvaeBtn) {
      observer();
    }
  }, [props.user.id, props.updater, timeZone]);

  const observer = () => {
    updateUserData();
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
    if (
      array.filter((item) => item.status === false).length !== 0 &&
      editProfileStateObject.phone.match(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
      ) !== null &&
      editProfileStateObject.phone.match(
        /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
      )[0].length > 5 &&
      editProfileStateObject.email.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
      ) !== null
    ) {
      props.changeStateOfTheSvaeBtn(true);
    } else {
      props.changeStateOfTheSvaeBtn(false);
    }
  };

  const deleteProfile = () => {
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
              user={props.user}
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
