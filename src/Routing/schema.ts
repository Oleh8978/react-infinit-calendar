import { ComponentType, ComponentProps } from 'react';
import ProtectedRoute from 'Routing/ProtectedRoute';
import { RouteComponentProps } from 'react-router-dom';

//Views
import Discovery from 'View/Discovery';
import NotFound from '../View/Static/NotFound';
import Schedule from '../View/Schedule';
import Account from '../View/Account';

// Interfaces
interface IRoute {
  readonly name: Pages;
  readonly path: string;
  readonly isExact: boolean;
  readonly component: ComponentType<
    RouteComponentProps<any> & ComponentProps<any> & { opacity: number }
  >;
}

export type Pages =
  | 'discovery'
  | 'schedule'
  | 'module'
  | 'module-tasks'
  | 'module-help'
  | 'module-notes'
  | 'journey'
  | 'checkout'
  | 'article'
  | 'faq-form'
  | 'task'
  | 'expert'
  | 'account'
  | 'account-settings'
  | 'account-edit'
  | 'account-connected-socials'
  | 'account-notes'
  | 'about'
  | 'privacy-policy'
  | 'notFound';

class RoutingSchema {
  private schema: IRoute[] = [
    {
      name: 'discovery',
      path: '/discovery',
      isExact: true,
      component: ProtectedRoute(Discovery, 'ANONYMOUS_USERS'),
    },
    {
      name: 'schedule',
      path: '/schedule',
      isExact: true,
      component: ProtectedRoute(Schedule, 'ANONYMOUS_USERS'),
    },
    {
      name: 'account',
      path: '/account',
      isExact: true,
      component: ProtectedRoute(Account, 'ANONYMOUS_USERS'),
    },
    // {
    //   name: "payment",
    //   path: "/dedications/:id/buy"
    // },
    {
      name: 'notFound',
      path: '*',
      isExact: true,
      component: ProtectedRoute(NotFound, 'ANONYMOUS_USERS'),
    },
  ];
  private findRouteByPath(path: string): IRoute | undefined {
    return this.schema.find(({ path: routePath }) => routePath === path);
  }
  private findRouteByName(name: Pages): IRoute | undefined {
    return this.schema.find(({ name: routeName }) => routeName === name);
  }

  public get getSchema() {
    return this.schema;
  }

  public getLink(name: Pages): string {
    const route = this.findRouteByName(name);

    if (route && route.path) {
      return route.path;
    } else {
      return '/error';
    }
  }
  public getName(path: string): Pages | false {
    const route = this.findRouteByPath(path);

    if (route && route.path) {
      return route.name;
    } else {
      return false;
    }
  }
}

export default new RoutingSchema();
