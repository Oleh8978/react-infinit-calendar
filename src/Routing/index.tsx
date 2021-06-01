import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';

import { IStore } from 'Controller/model';
import { ISetAuthenticatedStatus } from 'Controller/auth/model';

// Actions
import { setAuthenticatedStatus, loginByToken } from 'Controller/auth/actions';

// Routing schema
import RoutingSchema from './schema';
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
  push: (path: string) => void;
  loginByToken: (token: string) => void;
}

const Routing: React.FC<Props> = ({ authStatus, ...props }) => {
  const location = useLocation();
  // useEffect(() => {
  //   if (localStorage.token) {
  //     props.loginByToken(localStorage.token);
  //   } else {
  //     props.setAuthenticatedStatus({ status: false });
  //   }
  // }, []);

  if (!authStatus) return <Login />;

  return <Login />;

  const transition = useTransition(location, {
    // from: { opacity: 0, left: 0, top: 0 },
    // enter: { opacity: 1, left: 0, top: 0 },
    // leave: { opacity: 0, left: 0, top: 0 },
  });

  return (
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
              renderView={props => <div {...props} className={'main-wrapper'}></div>}>
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
  );
};

export default connect(
  (state: IStore) => ({
    authStatus: state.authState.isAuthenticated,
    location: state.router.location,
  }),
  {
    setAuthenticatedStatus,
    push,
    loginByToken: loginByToken.request,
  },
)(Routing);
