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

  const nestedRoutes = (name) => {
    if (
      String(name) === 'discovery' &&
      String(String(location.pathname).search(/\/journey\/(.*)/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'schedule' &&
      String(String(location.pathname).search(/\/module\/(.*)/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'schedule' &&
      String(String(location.pathname).search(/\/expert-help\/(.*)/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'account' &&
      String(String(location.pathname).search(/\/notes/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'account' &&
      String(String(location.pathname).search(/\/note-details\/(.*)/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'account' &&
      String(String(location.pathname).search(/\/settings/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'account' &&
      String(String(location.pathname).search(/\/account-edit/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'account' &&
      String(String(location.pathname).search(/\/about/g)) !== '-1'
    ) {
      return 'active';
    }

    if (
      String(name) === 'account' &&
      String(String(location.pathname).search(/\/tip-list/g)) !== '-1'
    ) {
      return 'active';
    }

    return '';
  };

  const isActive = (name, rout) => {
    if (name === rout) {
      return 'active';
    } else {
      return nestedRoutes(name);
    }
  };

  const isActiveForNotes = (name) => {
    if (
      String(String(location.pathname).search(/\/module\/(.*)/g)) !== '-1' &&
      String(name) === 'schedule'
    ) {
      return 'active';
    }

    if (
      String(String(location.pathname).search(/\/note-details\/(.*)/g)) !==
        '-1' &&
      String(name) === 'account'
    ) {
      return 'active';
    }

    return '';
  };

  const windowFunctionality = ({ title, icon: Icon, name }) => {
    if (
      String(props.location.pathname).match(/note/) !== null &&
      props.isBtnSaveActive === true
    ) {
      return (
        <li className={`${isActiveForNotes(name)}`}>
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
