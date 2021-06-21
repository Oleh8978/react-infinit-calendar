import React, { useState } from 'react';

// interfaces
import { INavigationMenu } from './Models';
import InternalLink from '../../routing/Link';

interface IProps {
  menuOptions: INavigationMenu[];
  tabName: string;
  id: string
}

const NavigationMenu: React.FC<IProps> = ({ menuOptions, tabName, id }) => {
  return (
    <div className="module-menucontainer">
      <div className={'module-menu-navigation'}>
        {menuOptions.map((menuItem) => {
          return (
            <InternalLink
              to={'module-tab'}
              params={{
                id,
                tabName: menuItem.slug
              }}
              className={
                menuItem.slug === tabName
                  ? 'module-menu-navigation-item__active'
                  : 'module-menu-navigation-item'
              }
              key={menuItem.name}>
              {menuItem.name}
            </InternalLink>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationMenu;
