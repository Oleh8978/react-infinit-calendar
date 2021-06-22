import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

// components
import Link from '@app/routing/Link';

// static
import gear from './static/gear.svg';

// fake data
import fakeFace from './static/fakeFace.png';

// interfaces
import { IName } from './Models';
import { IStore } from 'Controller/model';
import { IUser, IUserData } from 'Controller/auth/model';

// get user data by token action
import { getUserAction } from 'Controller/account/actions';

interface IProps {
  user: IUser;
  getUserAction: any;
}

const Profile: React.FC<IProps> = ({ ...props }) => {
  const [userData, setUserData] = useState<IUserData>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData === undefined && props.user.userData !== undefined) {
      setUserData(props.user.userData);
    }

    if (props.user.userData === undefined) {
      console.log('inn');
      dispatch(props.getUserAction);
    }
  }, [props.user.id]);
  console.log('props.userData ', props.user);
  console.log('user data from local ', userData);
  return (
    <>
      {userData ? (
        <div className={'profile__top'}>
          <div className={'profile__top-img-wrapper'}>
            <img src={fakeFace} className={'profile-img'} alt="img" />
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
        <> </>
      )}
    </>
  );
};

// export default Profile;

export default connect(
  (state: IStore) => ({
    user: state.userReducer.user,
  }),
  { getUserAction: getUserAction.request },
)(Profile);
