import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import pen from '../Account/Settings/static/pen.png';

// components
import NoImageFound from '@app/view/LoginPages/NoImage';

// actions
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';

// static 
import onErorImage  from './imageAcountError/onErrorImage.png';

interface IProps {
  user?: IUser;
  updateUserDataAction: (userData: IUserDataExtended) => void;
  logoutMethod: () => void;
  setPageOpened: () => void;
  loader: boolean;
}

const AddYourData: React.FC<any> = ({ ...props }) => {
  const [image, setImage] = useState<string>(null);
  const [validationObject, setValidationObject] = useState<IvalidatorState[]>(
    validation,
  );
  const [
    isAllSiealdsArefiledOut,
    setIsAllSiealdsArefiledOut,
  ] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>(undefined);
  useEffect(() => {
    if (props.user !== undefined) {
      setImage(props.user.userData.image);
      setUserData(props.user);
    }
  }, [props.user]);

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
      return props.updateUserDataAction({
        firstName: validationObject[0].value,
        lastName: validationObject[1].value,
        image: userData.userData.image,
        email: validationObject[3].value,
        phone: validationObject[2].value,
        timezone: userData.userData.timezone,
        startTime: userData.userData.startTime,
        id: userData.id,
      });
    } else {
      return;
    }
  };
  return (
    <>
      {props.loader ? (
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
                        onError={(e: any)=>{e.target.onError = null; e.target.src= onErorImage}}
                      />
                    ) : (
                      <NoImageFound />
                    )}
                    <div className="settings-body-account-imgs-smallWrapper">
                      <img
                        className="settings-body-account-imgs-pen"
                        src={pen}
                        alt="img"
                      />
                    </div>
                  </div>
                </>
                <BodyEdditProfile
                  isFirstpage={true}
                  user={props.user}
                  validatorFunctionality={validatorFunctionality}
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
    loader: state.updateSteUserAfterSignIn.isLoading,
  }),
  {
    updateUserDataAction: updateUserDataAction.request,
  },
)(AddYourData);
