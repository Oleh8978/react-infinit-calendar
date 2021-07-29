import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Loader from '@app/component/Loader';

// inetrfaces
import { IStore } from '@app/controller/model';
import { IUserData } from '@app/controller/auth/model';

// Actions
import {
  loginByTokenAction,
  updateUserData,
} from '@app/controller/auth/actions';
import { updateUserDataAction } from '@app/controller/secondStepDataUpdater/actions';

// static
import pen from './static/pen.svg';
import onErorImage from '../../LoginPages/imageAcountError/onErrorImage.png';

// utils
import { getSavedAccess } from '@app/utils/manageAccess';

interface IProps {}

const AccountBody: React.FC<any> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUserData>(undefined);
  const [image, setImage] = useState<any>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData === undefined && props.user.userData !== undefined) {
      setUserData(props.user.userData);
    }

    if (props.user.userData === undefined && props.user.id === 0) {
      dispatch(props.getUserAction);
    }
  }, [props.user.id, image]);

  const imageSender = (e) => {
    if (e.target.files[0] && userData !== undefined) {
      userData.image = e.target.files[0];
      dispatch(props.updateUserDataAction(userData));
      setImage(e.target.files[0]);
    }

    dispatch(props.updateUserDataAction(userData));
  };
  return (
    <>
      {props.loader ? (
        <Loader isSmall={true} />
      ) : (
        <>
          {userData ? (
            <div className={'settings-body'}>
              <div className="settings-body-account">
                <div className="settings-body-account-imgs">
                  <>
                    <img
                      src={
                        props.imageAfterUpdate
                          ? props.imageAfterUpdate
                          : userData.image
                      }
                      className="settings-body-account-imgs-face"
                      alt="img"
                      onError={(e: any) => {
                        e.target.onError = null;
                        e.target.src = onErorImage;
                      }}
                    />
                  </>
                  <label className="settings-body-account-imgs-smallWrapper">
                    <input type="file" onChange={(e) => imageSender(e)} />
                    <img
                      className="settings-body-account-imgs-pen"
                      src={pen}
                      alt="img"
                    />
                  </label>
                </div>
                <div className="settings-body-account-names">
                  <div className={'profile__top-name'}>
                    <span className={'profile__top-f-name'}>
                      {userData.firstName}
                    </span>
                    <span className={'profile__top-l-name'}>
                      {userData.lastName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <> </>
          )}
        </>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    user: state.authState.user,
    loader: state.updateSteUserAfterSignIn.loaderState.status,
    imageAfterUpdate: state.updateSteUserAfterSignIn.userData.image,
  }),
  { updateUserDataAction: updateUserDataAction.request, loginByTokenAction },
)(AccountBody);
