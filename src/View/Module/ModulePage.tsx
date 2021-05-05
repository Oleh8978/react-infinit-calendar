import React, { useState } from 'react';

// components
import Overview from './MenuSections/Overview/Overview';
import Help from './MenuSections/Help/Help';
import Notes from './MenuSections/Notes/Notes';
import Tasks from './MenuSections/Tasks/Tasks';

// interfaces
import { INavigationMenu } from './Models';

interface IProps {
  menuItems: INavigationMenu[];
}

const ModulePage: React.FC<IProps> = ({ menuItems }) => {
  const body = (elements: INavigationMenu[]) => {
    let menuSection;
    elements.map( (element: INavigationMenu) => {
      if (element.name === 'Overview' && element.isActive === true) {
        menuSection =  <Overview />
      }

      if (element.name === 'Help' && element.isActive === true) {
        menuSection =  <Help />
      }

      if (element.name === 'Notes' && element.isActive === true) {
        menuSection = <Notes />
      }

      if (element.name === 'Tasks' && element.isActive === true) {
        menuSection = <Tasks /> 
      }
    })
    return menuSection
  }
  return <div className={'module-sections'}>{body(menuItems)}</div>;
};

export default ModulePage;
