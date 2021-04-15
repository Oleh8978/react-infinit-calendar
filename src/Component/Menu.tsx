import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import schema from 'Routing/schema';

import { IStore } from 'Controller/model';
import Link from 'Routing/Link';
// Icons

import Logo from 'Component/icon/Logo';
import { menuItems, routsWhereShowMenu } from '../Config';

const Menu: React.FC = () => {
  const location = useLocation();
  const nameRoute = schema.getName(location.pathname);
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
            <li className={nameRoute === name ? 'active' : ''}>
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
