import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import moment from 'moment';

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
import { setAuthenticatedStatus, logOut } from '@app/controller/auth/actions';

// data schema
import * as editList from './static';

// constnats
import { validation } from '../../LoginPages/utils/validation';
import { editProfileState, editProfileStateEquality } from './utils/constnats';

// helpers
import { getSavedAccess } from '@app/utils/manageAccess';

// utils functions
import { clearAccess } from '@app/utils/manageAccess';

interface IProps {
  isFirstpage?: boolean;
  user?: IUser;
  validatorFunctionality?: (key: string, value: string) => void;
  isEdditProfile?: boolean;
  validationState?: any;
  validationStateSetter?: (arrObjct: any[]) => void;
}

const BodyEdditProfile: React.FC<any> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUser>(undefined);
  const [validationObject, setValidationObject] =
    useState<IvalidatorState[]>(validation);
  const [isAllSiealdsArefiledOut, setIsAllSiealdsArefiledOut] =
    useState<boolean>(false);
  const [editProfileStateObject, setEditProfileStateObject] =
    useState<IFullObjectState>(editProfileState);
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

  const converter = () => {
    if (Number.isInteger(editProfileStateObject.startTime)) {
      return editProfileStateObject.startTime;
    } else {
      return moment
        .duration(
          moment(editProfileStateObject.startTime, ['h:mm A']).format('HH:mm'),
        )
        .asMinutes();
    }
  };
  const updateUserData = () => {
    if (isAllSiealdsArefiledOut && userData !== undefined) {
      const validationObjectUpdate = [...validationObject];
      validationObjectUpdate.map((item) => {
        if (item.name === 'phone') {
          if (
            validationObjectUpdate[validationObject.indexOf(item)].value.trim()
              .length === 14
          ) {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              true;
          } else {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              false;
          }
        } else if (item.name === 'email') {
          if (
            validationObjectUpdate[validationObject.indexOf(item)].value
              .length === 0
          ) {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              false;
          } else {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              true;
          }
          props.validationStateSetter(validationObjectUpdate);
        }
      });

      if (
        validationObjectUpdate
          .filter((item) => item.name === 'phone' || item.name === 'email')
          .filter((item) => item.isValid !== false).length === 2
      ) {
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
          startTime: converter(),
          id: userData.id,
        });
        props.validationStateSetter(validationObject);
      }
    } else if (!isAllSiealdsArefiledOut && userData !== undefined) {
      props.validationStateSetter(validationObject);
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
      !props.isFirstPage
    ) {
      props.changeStateOfTheSvaeBtn(true);
    } else {
      props.changeStateOfTheSvaeBtn(false);
    }
  };

  const deleteProfile = () => {
    props.deleteProfile({});
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
            validationState={props.validationState}
            observer={observer}
          />
          {props.isFirstpage ? (
            <></>
          ) : (
            <EdditProfileBodyComponent
              data={editList.BillingAddress}
              isFirstpage={props.isFirstpage}
              validatorFunctionality={validatorFunctionality}
              user={props.user}
              setObjectState={setObjectState}
              validationState={props.validationState}
              observer={observer}
            />
          )}
          <EdditProfileBodyComponent
            data={editList.TimingSettings}
            timeZones={editList.aryIannaTimeZones}
            user={props.user}
            validatorFunctionality={validatorFunctionality}
            setObjectState={setObjectState}
            validationState={props.validationState}
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
            validatorFunctionality={props.validatorFunctionalityFirstPage}
            setObjectState={setObjectState}
            validationState={props.validationState}
            observer={observer}
          />
          {props.isFirstpage ? (
            <></>
          ) : (
            <EdditProfileBodyComponent
              data={editList.BillingAddress}
              isFirstpage={props.isFirstpage}
              validatorFunctionality={props.validatorFunctionalityFirstPage}
              setObjectState={setObjectState}
              validationState={props.validationState}
              observer={observer}
            />
          )}
          <EdditProfileBodyComponent
            data={editList.TimingSettings}
            timeZones={editList.aryIannaTimeZones}
            user={props.user}
            validatorFunctionality={props.validatorFunctionalityFirstPage}
            setObjectState={setObjectState}
            validationState={props.validationState}
            observer={observer}
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
