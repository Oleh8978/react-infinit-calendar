import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Actions
import {
  setAuthenticatedStatus,
  loginByToken,
  logOut,
} from 'Controller/auth/actions';

// types
import { Pages } from 'Routing/schema';

// interfaces
import { IStore } from 'Controller/model';

import history from 'historyApi';
import { logoutSaga } from 'Controller/auth/sagas/auth';

interface IProps {
  logoutMethod: () => void;
}

const NavigationBarFirstPage: React.FC<any> = ({ ...props }) => {
  return (
    <>
      <div className={'module-menu'}>
        <div
          className="module-menu-col1"
          onClick={() => {
            props.logOut();
            props.logoutMethod();
          }}>
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

export default connect((state: IStore) => ({}), {
  setAuthenticatedStatus,
  logOut: logOut.request,
})(NavigationBarFirstPage);
