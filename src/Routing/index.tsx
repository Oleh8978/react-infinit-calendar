import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { push } from "connected-react-router";
import { connect } from "react-redux";

import { Transition, animated } from "react-spring";

import { IStore } from "Controller/model";
import { ISetAuthenticatedStatus } from "Controller/auth/model";

// Actions
import { setAuthenticatedStatus, loginByToken } from "Controller/auth/actions";

// Routing schema
import RoutingSchema from "./schema";
import Login from '../View/Login';

// Render all routes
const Routes = RoutingSchema.getSchema.map(
  ({component: Component, path, name, isExact}) => (
    <Route exact={isExact} key={name} path={path} component={Component}/>
  )
);

interface Props {
  location: any;
  authStatus?: boolean;
  setAuthenticatedStatus: (status: ISetAuthenticatedStatus) => void;
  push: (path: string) => void;
  loginByToken: (token: string) => void;
}

const Routing: React.FC<Props> = ({ location, authStatus, ...props }) => {
  if ((window as any).FirebasePlugin) {
    (window as any).FirebasePlugin.onMessageReceived((message: any) => {
      (window as any).FirebasePlugin.setBadgeNumber(0);
      props.push(message.link);
    }, (error: Error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    if (localStorage.token) {
      props.loginByToken(localStorage.token);
    } else {
      props.setAuthenticatedStatus({ status: false });
    }
  }, [])

  if(!authStatus) return <Login />

  return (
    <div className="wrapper-main" id={"wrapper-main-element"}>
      <Transition
        from={{ opacity: 0, position: "relative", left: 0, top: 0 }}
        enter={{ opacity: 1, position: "relative", left: 0, top: 0 }}
        leave={{ opacity: 0, position: "absolute", left: 0, top: 0 }}
        items={location}
        keys={(location: any) => location.pathname}
      >
        {(item: any) => (props: any) => (
          <animated.div style={props} className="main" id={"main"}>
            <Switch location={item}>
              {Routes}
              <Redirect to={RoutingSchema.getLink('discovery')}/>
            </Switch>
          </animated.div>
        )}
      </Transition>
    </div>
  );
}

export default connect(
  (state: IStore) =>
    ({
      authStatus: state.authState.isAuthenticated,
      location: state.router.location
    }),
  {
    setAuthenticatedStatus,
    push,
    loginByToken: loginByToken.request
  }
)(Routing)