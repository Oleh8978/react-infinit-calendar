import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

// custom components
import NavigationMenu from './Menu';

// constants
import * as menuConstats from './constants';

// history
import history from 'historyApi';

// interfaces
import { INavigationMenu } from './Models';

interface IProps extends RouteComponentProps {}

const Module: React.FC<IProps> = () => {
  const [menuItems, setMenuItems] = useState<INavigationMenu[]>(
    menuConstats.menuOptions,
  );

  const setIsclicked = (name: string) => {
    const arr = [...menuItems];
    arr.map((item: INavigationMenu) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    setMenuItems(arr);
  };
  return (
    <div className={'module'}>
      <div className={'module-menu'}>
        <div className="module-menu-col1">
          {' '}
          <div
            className="module-menu-back"
            onClick={() => {
              history.push('/schedule');
            }}>
            <div className="module-menu-back__top" />
            <div className="module-menu-back__bottom" />
          </div>
        </div>
        <div className="module-menu-col2">{menuConstats.moduleMenu}</div>
        <div className="module-menu-col3" />
      </div>
      <div className={'module-body'}>
        <NavigationMenu menuOptions={menuItems} setIsclicked={setIsclicked} />
      </div>
    </div>
  );
};

export default Module;
