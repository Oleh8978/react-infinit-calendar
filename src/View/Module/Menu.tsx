import React, { useState } from 'react';

// interfaces
import { INavigationMenu } from './Models';

interface IProps {
  menuOptions: INavigationMenu[];
  setIsclicked: (name: string) => void;
}

const NavigationMenu: React.FC<IProps> = ({ menuOptions, setIsclicked }) => {
  return (
    <div className={'module-menu-navigation'}>
      {menuOptions.map((menuItem) => {
        return (
          <div
            className={
              menuItem.isActive
                ? 'module-menu-navigation-item__active'
                : 'module-menu-navigation-item'
            }
            onClick={() => setIsclicked(menuItem.name)}
            key={menuItem.name}>
            {menuItem.name}
          </div>
        );
      })}
    </div>
  );
};

export default NavigationMenu;
