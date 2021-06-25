import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Loader from 'Component/Loader';

// inetrfaces
import { IStore } from 'Controller/model';
import { IUserData } from 'Controller/auth/model';

// Actions
import { loginByTokenAction } from 'Controller/auth/actions';

// static
import pen from './static/pen.png';
import onErorImage from '../../LoginPages/imageAcountError/onErrorImage.png';

interface IProps {}

const AccountBody: React.FC<any> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUserData>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData === undefined && props.user.userData !== undefined) {
      setUserData(props.user.userData);
    }

    if (props.user.userData === undefined && props.user.id === 0) {
      dispatch(props.getUserAction);
    }
  }, [props.user.id]);
  return (
    <>
      {userData ? (
        <div className={'settings-body'}>
          <div className="settings-body-account">
            <div className="settings-body-account-imgs">
              <>
                <img
                  src={userData.image}
                  className="settings-body-account-imgs-face"
                  alt="img"
                  onError={(e: any) => {
                    e.target.onError = null;
                    e.target.src = onErorImage;
                  }}
                />
              </>
              <div className="settings-body-account-imgs-smallWrapper">
                <img
                  className="settings-body-account-imgs-pen"
                  src={pen}
                  alt="img"
                />
              </div>
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
  );
};

export default connect(
  (state: IStore) => ({
    user: state.authState.user,
  }),
  { loginByTokenAction },
)(AccountBody);
