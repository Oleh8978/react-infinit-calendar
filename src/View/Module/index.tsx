import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

// custom components
import NavigationBar from 'Component/NavigationBar';
import NavigationMenu from './Menu';
import ModulePage from './ModulePage';

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

  // const setSaveButton = () => {
  //
  // }
  //
  // setSaveButton();

  return (
    <div className={'module'}>
      <NavigationBar rout={'schedule'} name={'Module name '} hasSaveButton={false}/>
      <div className={'module-body'}>
        <NavigationMenu menuOptions={menuItems} setIsclicked={setIsclicked} />
        <ModulePage menuItems={menuItems} />
      </div>
    </div>
  );
};

export default Module;
