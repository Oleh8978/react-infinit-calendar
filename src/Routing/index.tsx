import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';

// utils functions
import { getSavedAccess } from 'utils/manageAccess';

// interfaces
import { IStore } from 'Controller/model';
import { ISetAuthenticatedStatus, IUser } from 'Controller/auth/model';

// Actions
import { setAuthenticatedStatus, loginByToken } from 'Controller/auth/actions';

// Routing schema
import RoutingSchema from './schema';

// components
import Login from '../View/Login';
import Menu from '../Component/Menu';
import Loader from 'Component/Loader';

// clear access method 
import { clearAccess } from 'utils/manageAccess';

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
  isNeededSecondStep: boolean;
  loginByToken: (token: string) => void;
  loader: boolean;
  user: IUser;
}

const Routing: React.FC<Props> = ({
  authStatus,
  // isNeededSecondStep,
  user,
  ...props
}) => {
  const [userData, setUserData] = useState<IUser>(undefined);
  const isNeededSecondStep = false;
  useEffect(() => {
    const authData = getSavedAccess();
    if (authData.accessToken && authData.refreshToken) {
      props.loginByToken(authData.accessToken);
      if (user !== undefined) {
        setUserData(user)
      }
    } else {
      props.setAuthenticatedStatus({ status: false });
      // props.setAuthenticatedStatus({ status: true });
    }
  }, [user]);
  const location = useLocation();

  const transition = useTransition(location, {
    // from: { opacity: 0, left: 0, top: 0 },
    // enter: { opacity: 1, left: 0, top: 0 },
    // leave: { opacity: 0, left: 0, top: 0 },
  });
  console.log('isNeededSecondStep ', isNeededSecondStep);
  console.log('authStatus ', authStatus);

  const logoutMethod = () => {
    props.setAuthenticatedStatus({ status: false });
    clearAccess();
  }
  if (
    (!authStatus && isNeededSecondStep) ||
    (!authStatus && !isNeededSecondStep) ||
    (authStatus && isNeededSecondStep)
  )
    return (
      <>
        {props.loader ? (
          <Loader />
        ) : (
          <Login
            authStatus={authStatus}
            isNeededSecondStep={isNeededSecondStep}
            user={userData}
            logoutMethod={logoutMethod}
          />
        )}
      </>
    );

  if (authStatus && !isNeededSecondStep)
    return (
      <>
        {/* {authStatus && isLoginPageOpened ? (
        {/* for the form usage take a look on the prev row*/}
        {props.loader ? (
          <Loader />
        ) : (
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
        )} 
      </>
    );
};

export default connect(
  (state: IStore) => ({
    authStatus: state.authState.isAuthenticated,
    location: state.router.location,
    loader: state.authState.state.isLoading,
    isNeededSecondStep: state.authState.user.isNeedSecondStep,
    user: state.authState.user,
  }),
  {
    setAuthenticatedStatus,
    push,
    loginByToken: loginByToken.request,
  },
)(Routing);
