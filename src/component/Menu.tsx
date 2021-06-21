import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import schema from '@app/routing/schema';

import { IStore } from '@app/controller/model';
import Link from '@app/routing/Link';
// Icons

import Logo from '@app/component/icon/Logo';
import { menuItems, routsWhereShowMenu } from '../config';

const Menu: React.FC = () => {
  const location = useLocation();
  const nameRoute = schema.getName(location.pathname);

  const isActive = (name, rout) => {
    if (name === rout) {
      return 'active';
    } else {
      return '';
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
          return (
            <li className={`${isActive(name, nameRoute)}`}>
              <Link to={name}>
                <Icon />
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </menu>
    </div>
  );
};

export default connect((state: IStore) => ({
  authStatus: !!state.authState.isAuthenticated,
  location: state.router.location,
}))(Menu);
