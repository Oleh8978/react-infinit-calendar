import React, { useState } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import history from 'historyApi';

interface IProps {
  rout: string;
  name: string;
}

const NavigationBar: React.FC<IProps> = ({ rout, name }) => {
  return (
    <div className={'module-menu'}>
      <div className="module-menu-col1">
        {' '}
        <div
          className="module-menu-back"
          onClick={() => {
            history.push(rout);
          }}>
          <div className="module-menu-back__top" />
          <div className="module-menu-back__bottom" />
        </div>
      </div>
      <div className="module-menu-col2">{name}</div>
      <div className="module-menu-col3" />
    </div>
  );
};

export default NavigationBar;
