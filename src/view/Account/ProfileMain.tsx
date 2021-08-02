import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Link from '@app/routing/Link';
import Loader from '@app/component/Loader';

// static
import gear from './static/gear.svg';
import onErorImage from '../LoginPages/imageAcountError/onErrorImage.png';

// interfaces
import { IStore } from '@app/controller/model';
import { IUser, IUserData } from '@app/controller/auth/model';

// Actions
import { loginByTokenAction } from '@app/controller/auth/actions';

interface IProps {
  user: IUser;
  getUserAction: any;
}

const Profile: React.FC<any> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUserData>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.user.userData !== undefined) {
      setUserData(props.user.userData);
    }

    if (props.user.userData === undefined && props.user.id === 0) {
      dispatch(props.getUserAction);
    }
  }, [props.user.id]);
  return (
    <>
      {userData ? (
        <div className={'profile__top'}>
          <div className={'profile__top-img-wrapper'}>
            <img
              src={userData.image}
              className={'profile-img'}
              alt="img"
              onError={(e: any) => {
                e.target.onError = null;
                e.target.src = onErorImage;
              }}
            />
          </div>
          <div className={'profile__top-name'}>
            <span className={'profile__top-f-name'}>{userData.firstName}</span>
            <span className={'profile__top-l-name'}>{userData.lastName}</span>
          </div>
          <div className={'profile__top-options'}>
            <Link to={'settings'}>
              <img
                src={gear}
                className={'profile__top-options-img'}
                alt="img"
              />
            </Link>
          </div>
        </div>
      ) : (
        <>
          {' '}
          <Loader isSmall={true} />
        </>
      )}
    </>
  );
};

export default connect(
  (state: IStore) => ({
    user: state.authState.user,
  }),
  { loginByTokenAction },
)(Profile);
