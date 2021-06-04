import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';

import { IStore } from 'Controller/model';
import { ISetAuthenticatedStatus } from 'Controller/auth/model';

// Actions
import {
  setAuthenticatedStatus,
  loginByToken,
  setInfoAreAllfiealdsFilledOut,
} from 'Controller/auth/actions';

// Routing schema
import RoutingSchema from './schema';

// components
import Login from '../View/Login';
import Menu from '../Component/Menu';

// Render all routes
const Routes = RoutingSchema.getSchema.map(
  ({ component: Component, path, name, isExact }) => (
    <Route exact={isExact} key={name} path={path} component={Component} />
  ),
);

interface Props {
  location: any;
  authStatus?: boolean;
  setAuthenticatedStatus: (status: ISetAuthenticatedStatus) => void;
  setInfoAreAllfiealdsFilledOut: (boolean) => void;
  push: (path: string) => void;
  isAllfiealdsFilledOut: boolean;
  loginByToken: (token: string) => void;
}

const Routing: React.FC<Props> = ({
  authStatus,
  isAllfiealdsFilledOut,
  ...props
}) => {
  useEffect(() => {
    if (localStorage.authorization) {
      props.loginByToken(localStorage.authorization);
      // setInfoAreAllfiealdsFilledOut({ isAllAreFilledOut: false });
      console.log('localStorage.token ', localStorage.authorization);
    } else {
      console.log('localStorage.token false ', localStorage.authorization);
      props.setAuthenticatedStatus({ status: false });
    }
    // console.log('localStorage.token false ', localStorage.authorization)
    console.log('isAllfiealdsFilledOut ', isAllfiealdsFilledOut);
    console.log('authStatus ', authStatus);
  }, []);
  const location = useLocation();

  const transition = useTransition(location, {
    // from: { opacity: 0, left: 0, top: 0 },
    // enter: { opacity: 1, left: 0, top: 0 },
    // leave: { opacity: 0, left: 0, top: 0 },
  });
  // isAllfiealdsFilledOut
  // setInfoAreAllfiealdsFilledOut: ({ isAllfields: boolean }) => void;
  if (!authStatus) return <Login />;

  if (authStatus)
    return (
      <>
        {/* {authStatus && isLoginPageOpened ? ( */}
        <div className={'main-layout'}>
          <div className="wrap-main">
            {transition((style, item) => (
              <animated.div
                key={String(item)}
                style={style}
                className="main"
                id={'main'}>
                <Scrollbars
                  style={{
                    width: '100%',
                    maxWidth: 639,
                    height: '100%',
                    maxHeight: '100%',
                    display: 'flex',
                  }}
                  renderView={(props) => (
                    <div {...props} className={'main-wrapper'}></div>
                  )}>
                  <Switch location={item}>
                    {Routes}
                    <Redirect to={RoutingSchema.getLink('discovery')} />
                  </Switch>
                </Scrollbars>
              </animated.div>
            ))}
          </div>
          <Menu />
        </div>
        {/* ) : (
        <Login />
      )} */}
      </>
    );
};

export default connect(
  (state: IStore) => ({
    authStatus: state.authState.isAuthenticated,
    isAllfiealdsFilledOut: state.authState.isAllfiealdsFilledOut,
    location: state.router.location,
  }),
  {
    setAuthenticatedStatus,
    setInfoAreAllfiealdsFilledOut,
    push,
    loginByToken: loginByToken.request,
  },
)(Routing);
