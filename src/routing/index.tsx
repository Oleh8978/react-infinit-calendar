import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect, useDispatch } from 'react-redux';
import { useTransition, animated } from 'react-spring';
import { Scrollbars } from 'react-custom-scrollbars';

// utils functions
import { getSavedAccess, clearAccess } from '@app/utils/manageAccess';

// interfaces
import { IStore } from '@app/controller/model';
import {
  ISetAuthenticatedStatus,
  IUser,
  IAuthData,
} from '@app/controller/auth/model';
import { IUserData } from '@app/controller/account/models';

// Actions
import {
  setAuthenticatedStatus,
  loginByTokenAction,
  setIsneedSecondStep,
} from '@app/controller/auth/actions';

// Routing schema
import RoutingSchema, { IRoute } from './schema';

// components
import Login from '@app/view/Login';
import Menu from '@app/component/Menu';
import Loader from '@app/component/Loader';

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
  loader: boolean;
  user: IUser;
  isSecondStepPassed: any;
  loginByTokenAction: (data: IAuthData) => void;
  setIsneedSecondStep: () => void;
  userData?: IUserData;
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

  useEffect(() => {
    const authData = getSavedAccess();
    if (authData.accessToken && authData.refreshToken) {
      if (authStatus === false) {
        props.loginByTokenAction(authData);
      }

      if (
        (user !== undefined && userData === undefined) ||
        (user !== undefined &&
          userData !== undefined &&
          userData.createdAt.trim().length === 0)
      ) {
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
  }, [props.isSecondStepPassed, user, props.userData]);

  const location = useLocation();

  const transition = useTransition(location, {
    // from: { opacity: 0, left: 0, top: 0 },
    // enter: { opacity: 1, left: 0, top: 0 },
    // leave: { opacity: 0, left: 0, top: 0 },
  });

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
    userData: state.userReducer.user.userData,
    userDataLoader: state.userReducer.isLoading.status,
  }),
  {
    setAuthenticatedStatus,
    push,
    loginByTokenAction,
  },
)(Routing);
