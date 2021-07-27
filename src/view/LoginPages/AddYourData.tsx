import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// components
import BodyEdditProfile from '../Account/EditProfile/BodyEdditProfile';
import NavigationBarFirstPage from '@app/component/NavBarFirstPage';
import DeletePageBTN from '@app/component/DeletePageBTN';
import Loader from '@app/component/Loader';

// interfaces
import { IUser, IUserData } from '@app/controller/auth/model';
import { IvalidatorState } from './utils/models';
import { IStore } from '@app/controller/model';
import { IUserDataExtended } from '@app/controller/secondStepDataUpdater/models';

// constants
import { validation } from './utils/validation';
import pen from '../Account/Settings/static/pen.svg';

// components
import NoImageFound from '@app/view/LoginPages/NoImage';

// actions
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';
import { loginByTokenAction } from '@app/controller/auth/actions';
// utils
import {
  entryValidator,
  timeZoneReturner,
} from '../Account/EditProfile/EditProfileComponents/utils/utils';

import { validationShort } from './utils/validation';
// static
import onErorImage from './imageAcountError/onErrorImage.png';
// utils
import { getSavedAccess } from '@app/utils/manageAccess';

interface IProps {
  user?: IUser;
  updateUserDataAction: (userData: IUserDataExtended) => void;
  logoutMethod: () => void;
  setPageOpened: () => void;
  loader: boolean;
}

const AddYourData: React.FC<any> = ({ ...props }) => {
  const [isSaveBtnActivState, setISSaveBtnActiveState] =
    useState<boolean>(false);
  const [image, setImage] = useState<string>(null);
  const [validationObject, setValidationObject] =
    useState<IvalidatorState[]>(validation);
  const [isAllSiealdsArefiledOut, setIsAllSiealdsArefiledOut] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>(undefined);
  const [validationState, setValidationState] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.user !== undefined && props.user.userData !== undefined) {
      setImage(props.user.userData.image);
      setUserData(props.user);
      const newValidation = [];
      validationShort.map((item) => {
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

    if (props.user === undefined) {
      dispatch(
        loginByTokenAction({
          accessToken: getSavedAccess().accessToken,
          refreshToken: getSavedAccess().refreshToken,
        }),
      );
    }
  }, [props.user, image]);

  const validationStateFunction = (objArr: any[]) => {
    setValidationState(objArr);
  };

  const changeStateOfTheSvaeBtn = (value: boolean) => {
    setISSaveBtnActiveState(value);
  };

  const updatedValidationObject = validationObject.filter(
    (item) =>
      item.name === 'firstName' ||
      item.name === 'lastName' ||
      item.name === 'phone' ||
      item.name === 'email' ||
      item.name === 'timeZone' ||
      item.name === 'startTime' ||
      item.name === 'timezone',
  );

  const validatorFunctionalityFirstPage = (key: string, value: string) => {
    const element = validationObject.find((item) => item.name === key);
    if (element !== undefined) {
      validationObject[validationObject.indexOf(element)].value = value;
      if (String(value).trim().length !== 0) {
        validationObject[validationObject.indexOf(element)].isValid = true;
      } else {
        validationObject[validationObject.indexOf(element)].isValid = false;
      }
      setValidationObject(validationObject);
      setValidity();
    }
  };

  const setValidity = () => {
    const anyInvalid = updatedValidationObject.find(
      (item) => item.isValid === false,
    );
    if (anyInvalid === undefined) {
      setIsAllSiealdsArefiledOut(true);
    } else {
      setIsAllSiealdsArefiledOut(false);
    }
  };

  const updateUserData = () => {
    if (isAllSiealdsArefiledOut && userData !== undefined) {
      const validationObjectUpdate = [...validationObject];
      validationObjectUpdate.map((item) => {
        if (item.name === 'phone') {
          if (
            validationObjectUpdate[validationObject.indexOf(item)].value.trim()
              .length >= 15
          ) {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              true;
          } else {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              false;
          }
        } else if (item.name === 'email') {
          if (
            validationObjectUpdate[validationObject.indexOf(item)].value.match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
          ) {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              true;
          } else {
            validationObjectUpdate[validationObject.indexOf(item)].isValid =
              false;
          }
          setValidationObject(validationObjectUpdate);
        }
      });

      if (
        validationObjectUpdate
          .filter((item) => item.name === 'phone' || item.name === 'email')
          .filter((item) => item.isValid !== false).length === 2
      ) {
        return props.updateUserDataAction({
          firstName: validationObject[0].value,
          lastName: validationObject[1].value,
          image: userData.userData.image,
          email: validationObject[3].value,
          phone: validationObject[2].value,
          timezone:
            userData.userData.timezone.length < 4
              ? timeZoneReturner(userData.userData.timezone)
              : userData.userData.timezone,
          startTime: userData.userData.startTime,
          id: userData.id,
        });
      }
    } else {
      return;
    }
  };

  const imageSender = (e) => {
    if (e.target.files[0] && userData !== undefined) {
      userData.userData.image = e.target.files[0];
      dispatch(props.updateUserDataAction(userData.userData));
      setImage(e.target.files[0]);
    }

    dispatch(props.updateUserDataAction(userData.userData));
  };
  return (
    <>
      {props.loader && props.user === undefined ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className={'main-layout'}>
            <div className="wrap-main">
              <Scrollbars
                style={{
                  width: '100%',
                  minWidth: '100%',
                  maxWidth: 639,
                  height: '100%',
                  maxHeight: '100%',
                  display: 'flex',
                }}
                renderView={(props) => (
                  <div {...props} className={'main-wrapper'}></div>
                )}>
                <NavigationBarFirstPage logoutMethod={props.logoutMethod} />
                <>
                  <div className="add-yuor-data-imgwrapper">
                    {image ? (
                      <img
                        className="add-yuor-data-imgwrapper-img"
                        alt="img"
                        src={image}
                        onError={(e: any) => {
                          e.target.onError = null;
                          e.target.src = onErorImage;
                        }}
                      />
                    ) : (
                      <NoImageFound />
                    )}
                    <label className="settings-body-account-imgs-smallWrapper">
                      <input type="file" onChange={(e) => imageSender(e)} />
                      <img
                        className="settings-body-account-imgs-pen"
                        src={pen}
                        alt="img"
                      />
                    </label>
                  </div>
                </>
                <BodyEdditProfile
                  isFirstpage={true}
                  user={props.user}
                  validationState={validationState}
                  setUserData={setUserData}
                  changeStateOfTheSvaeBtn={changeStateOfTheSvaeBtn}
                  validationStateSetter={validationStateFunction}
                  validatorFunctionalityFirstPage={
                    validatorFunctionalityFirstPage
                  }
                />
                <div className="main-page-btn">
                  <DeletePageBTN
                    text={'Good, Let’s Proceed'}
                    eventHandler={updateUserData}
                    classes={
                      isAllSiealdsArefiledOut
                        ? ' main-page-btn-main'
                        : ' main-page-btn-main-inactive'
                    }
                  />
                </div>
              </Scrollbars>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    isSecondStepPassed: state.updateSteUserAfterSignIn.isSecondStepPassed,
    loader: state.updateSteUserAfterSignIn.loaderState.status,
    imageAfterUpdate: state.updateSteUserAfterSignIn.userData.image,
  }),
  {
    updateUserDataAction: updateUserDataAction.request,
  },
)(AddYourData);
