import * as React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import schema from './schema';

// Selectors
import { getAuthStatus } from '@app/controller/auth';

// Types
import { IStore } from '@app/controller/model';

interface ProtectedRouteProps extends RouteComponentProps {
  isAuthenticated?: boolean;
  role?: string;
}

type RouteAccesses =
  | 'AUTHENTICATED_USERS'
  | 'UNAUTHENTICATED_USERS'
  | 'ANONYMOUS_USERS';

export const RedirectToHome = () => {
  return <Redirect to={schema.getLink('discovery')} />;
};

const connectFunc = connect((state: IStore) => ({
  isAuthenticated: getAuthStatus(state),
}));

export const ProtectedRoute = (
  ProtectedRoute:
    | React.ComponentType<RouteComponentProps>
    | React.FC
    | ConnectedComponent<any, any>,
  routeAccess: RouteAccesses | RouteAccesses[],
) =>
  connectFunc(
    class Component extends React.PureComponent<ProtectedRouteProps> {
      state = {
        component: null,
      };

      componentDidMount() {
        console.log('mount');
        let component = <ProtectedRoute {...this.props} />;
        if (
          !this.props.isAuthenticated &&
          routeAccess === 'AUTHENTICATED_USERS'
        ) {
          component = <Redirect to="/login" />;
        }

        if (
          this.props.isAuthenticated &&
          routeAccess === 'UNAUTHENTICATED_USERS'
        ) {
          component = <Redirect to="/" />;
        }

        this.setState({ component });
      }

      componentDidUpdate(prevProps: Readonly<ProtectedRouteProps>) {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
          let component = <ProtectedRoute {...this.props} />;
          if (
            routeAccess === 'AUTHENTICATED_USERS' &&
            this.props.isAuthenticated === false
          ) {
            component = <Redirect to="/login" />;
          }
          if (
            routeAccess === 'UNAUTHENTICATED_USERS' &&
            this.props.isAuthenticated === true
          ) {
            component = <Redirect to="/" />;
          }
          this.setState({ component });
        }
      }

      public render() {
        return this.state.component;
      }
    },
  );

export default ProtectedRoute;
