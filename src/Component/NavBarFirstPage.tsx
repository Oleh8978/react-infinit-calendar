import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

// components
import Link from 'Routing/Link';
import Pen from './CustomButtons/Pen';

// types
import { Pages } from 'Routing/schema';

import history from 'historyApi';

interface IProps {

}

const NavigationBarFirstPage: React.FC<IProps> = ({ ...props }) => {
  return (
    <>
      <div className={'module-menu'}>
        <div className="module-menu-col1">
          <div className="module-menu-back">
            <div className="module-menu-back__top" />
            <div className="module-menu-back__bottom" />
          </div>
        </div>
        <div className="module-menu-col2">Profile information</div>
        <div className="module-menu-col3"></div>
      </div>
    </>
  );
};

export default NavigationBarFirstPage;
