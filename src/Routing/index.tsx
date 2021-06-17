import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';

// Utils functions
import { getSavedAccess } from 'Utils/manageAccess';

// interfaces
import { IStore } from 'Controller/model';
import { ISetAuthenticatedStatus, IUser } from 'Controller/auth/model';

// Actions
import {
  setAuthenticatedStatus,
  loginByToken,
  setIsneedSecondStep,
} from 'Controller/auth/actions';

// Routing schema
import RoutingSchema, { IRoute } from './schema';

// components
import Login from '../View/Login';
import Menu from '../Component/Menu';
import Loader from 'Component/Loader';

// clear access method
import { clearAccess } from 'Utils/manageAccess';

// Render all routes
const generateRoutes = (routes: IRoute[]) => {
  return routes.map(({ component: Component, ...route }) => (
    <Route
      exact={route.isExact}
      key={route.name}
      path={route.path}
      render={(props) => {
        return (
          <Component
            key={route.name + Object.values(props.match.params).join(',')}
            {...props}>
            {route.childRoutes ? (
              <Switch>{generateRoutes(route.childRoutes)}</Switch>
            ) : (
              <></>
            )}
          </Component>
        );
      }}
    />
  ));
};

const Routes = generateRoutes(RoutingSchema.getSchema);

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
  isSecondStepPassed: any;
  setIsneedSecondStep: () => void;
}

const Routing: React.FC<Props> = ({
  authStatus,
  isNeededSecondStep,
  user,
  ...props
}) => {
  const [userData, setUserData] = useState<IUser>(undefined);
  const [
    isNeeededSecondStepValue,
    setIsNeededSecondSteValue,
  ] = useState<boolean>(true);
  // const isNeededSecondStep = true;
  useEffect(() => {
    const authData = getSavedAccess();
    if (authData.accessToken && authData.refreshToken) {
      props.loginByToken(authData.accessToken);
      if (user !== undefined) {
        setUserData(user);
      }
    } else {
      props.setAuthenticatedStatus({ status: false });
    }

    if (isNeededSecondStep === true) {
      setIsNeededSecondSteValue(true);
    } else {
      setIsNeededSecondSteValue(false);
    }

    if (props.isSecondStepPassed === true) {
      setPageOpened();
    }
  }, [user, props.isSecondStepPassed]);

  const location = useLocation();

  const transition = useTransition(location, {
    // from: { opacity: 0, left: 0, top: 0 },
    // enter: { opacity: 1, left: 0, top: 0 },
    // leave: { opacity: 0, left: 0, top: 0 },
  });
  // console.log('isNeededSecondStep ', isNeededSecondStep);
  // console.log('authStatus ', authStatus);

  const setPageOpened = () => {
    setIsNeededSecondSteValue(false);
    setIsneedSecondStep({
      ...userData,
      isNeedSecondStep: false,
    });
  };

  const logoutMethod = () => {
    props.setAuthenticatedStatus({ status: false });
    clearAccess();
  };

  if (
    (!authStatus && isNeeededSecondStepValue) ||
    (!authStatus && !isNeeededSecondStepValue) ||
    (authStatus && isNeeededSecondStepValue)
  )
    return (
      <>
        {props.loader ? (
          <Loader />
        ) : (
          <Login
            authStatus={authStatus}
            isNeededSecondStep={isNeeededSecondStepValue}
            user={userData}
            setPageOpened={setPageOpened}
            logoutMethod={logoutMethod}
          />
        )}
      </>
    );

  if (authStatus && !isNeeededSecondStepValue)
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
                      <div {...props} className={'main-wrapper'} />
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
    isSecondStepPassed: state.updateSteUserAfterSignIn.isSecondStepPassed,
    user: state.authState.user,
  }),
  {
    setAuthenticatedStatus,
    push,
    loginByToken: loginByToken.request,
  },
)(Routing);
