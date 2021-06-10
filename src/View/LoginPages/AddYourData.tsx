import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// components
import BodyEdditProfile from '../Account/EditProfile/BodyEdditProfile';
import NavigationBarFirstPage from 'Component/NavBarFirstPage';
import DeletePageBTN from 'Component/DeletePageBTN';

// interfaces
import { IUser } from 'Controller/auth/model';
import { IvalidatorState } from './utils/models';
import { IStore } from 'Controller/model';
import { IUserDataExtended } from 'Controller/secondStepDataUpdater/models';
import { IUserData } from 'Controller/auth/model';

// constants
import { validation } from './utils/validation';
import pen from '../Account/Settings/static/pen.png';

// components
import NoImageFound from 'View/LoginPages/NoImage';

// actions
import { updateUserDataAction } from 'Controller/secondStepDataUpdater/actions';

interface IProps {
  user?: IUser;
  updateUserDataAction: (userData: IUserDataExtended) => void;
  logoutMethod: () => void;
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
  const [userData, setUserData] = useState<IUserData>(undefined);
  useEffect(() => {
    if (props.user !== undefined) {
      setImage(props.user.userData.image);
      setUserData(props.user.userData);
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
  if (props.user !== undefined) {
    console.log('props.user.userData ', props.user.userData)
  }

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
      console.log('')
      return props.updateUserDataAction({
        firstName: validationObject[0].value,
        lastName: validationObject[1].value,
        image: userData.image,
        email: validationObject[3].value,
        phone: validationObject[2].value,
        timezone: userData.timezone,
        startTime: userData.startTime,
        id: 1,
      });
    } else {
      return;
    }
  };
  return (
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
  );
};

export default connect((state: IStore) => ({}), {
  updateUserDataAction: updateUserDataAction.request,
})(AddYourData);
