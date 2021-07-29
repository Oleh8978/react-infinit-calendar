import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import schema from '@app/routing/schema';

import { IStore } from '@app/controller/model';
import Link from '@app/routing/Link';
// Icons

import Logo from '@app/component/icon/Logo';
import { menuItems, routsWhereShowMenu } from '../config';

// actions
import { setModalWindowOpened } from '@app/controller/modalWindowReducer/actions';

const Menu: React.FC<any> = ({ ...props }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const nameRoute = schema.getName(location.pathname);

  const isActive = (name, rout) => {
    if (name === rout) {
      return 'active';
    } else {
      return '';
    }
  };

  const windowFunctionality = ({ title, icon: Icon, name }) => {
    if (
      String(props.location.pathname).match(/note/) !== null &&
      props.isBtnSaveActive === true
    ) {
      return (
        <li className={`${isActive(name, nameRoute)}`}>
          <div
            className={'link-regular'}
            onClick={() => {
              dispatch(setModalWindowOpened({ status: true }));
            }}>
            <Icon />
            <span>{title}</span>
          </div>
        </li>
      );
    } else {
      return (
        <li className={`${isActive(name, nameRoute)}`}>
          <Link to={name}>
            <Icon />
            <span>{title}</span>
          </Link>
        </li>
      );
    }
  };

  return (
    <div
      className={
        'main-menu' +
        (nameRoute && routsWhereShowMenu.indexOf(nameRoute) !== -1
          ? ' show'
          : '')
      }>
      <Logo className={'logo'} />
      <menu>
        {menuItems.map(({ title, icon: Icon, name }) => {
          return windowFunctionality({ title, icon: Icon, name });
        })}
      </menu>
    </div>
  );
};

export default connect((state: IStore) => ({
  authStatus: !!state.authState.isAuthenticated,
  location: state.router.location,
  isBtnSaveActive: state.saveBtnReducer.isActive,
}))(Menu);
