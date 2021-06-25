import { ComponentType, ComponentProps } from 'react';
import ProtectedRoute from '@app/routing/ProtectedRoute';
import { matchPath, RouteComponentProps } from 'react-router-dom';

//Views
import Discovery from '@app/view/Discovery';
import NotFound from '@app/view/Static/NotFound';
import Schedule from '@app/view/Schedule';
import Account from '@app/view/Account';
import Module from '@app/view/Module';
import Journey from '@app/view/Journey/index';
import TaskInfo from '@app/view/Module/MenuSections/Tasks/TaskInfo';
import JourneyInfo from '@app/view/Account/JourneyInfo/index';
import Settings from '@app/view/Account/Settings/index';
import Notes from '@app/view/Account/Notes/index';
import SubmitQuestion from '@app/view/Discovery/SubmitQuestion/SubmitQuestion';
import Article from '@app/view/Discovery/Article/index';
import ReadMore from '@app/view/Module/MenuSections/ReadMore/ReadMore';
import ExpertHelp from '@app/view/Module/MenuSections/ExpertHelp/ExpertHelp';
import NoteDetails from '@app/view/Account/Notes/NoteDetails/index';
import EdditProfile from '@app/view/Account/EditProfile/index';
import ConnectedAccount from '@app/view/Account/ConnectedAccount/index';
import AboutPage from '@app/view/Account/About/index';
import PrivacyPolicy from '@app/component/PrivacyPolicy';
import Terms from '@app/component/Terms';
import ModuleTabContent from '@app/view/Module/ModuleTabContent';
import Holiday from '@app/view/Schedule/Holiday/Holiday';
import Task from '@app/view/Task';
import Checkout from '@app/view/Journey/Checkout';

// Interfaces
export interface IRoute {
  readonly name: Pages;
  readonly path: string;
  readonly isExact: boolean;
  readonly component: ComponentType<
    RouteComponentProps<any> & ComponentProps<any> & { opacity: number }
  >;
  readonly childRoutes?: IRoute[];
}

export type Pages =
  | 'linkedin'
  | 'discovery'
  | 'schedule'
  | 'module'
  | 'module-tab'
  | 'journey'
  | 'journey-info'
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
  | 'terms'
  | 'settings'
  | 'ask-question'
  | 'notes'
  | 'read-more'
  | 'expert-help'
  | 'note-details'
  | 'notFound';

class RoutingSchema {
  private schema: IRoute[] = [
    {
      name: 'discovery',
      path: '/',
      isExact: true,
      component: ProtectedRoute(Discovery, 'ANONYMOUS_USERS'),
    },
    {
      name: 'about',
      path: '/about',
      isExact: true,
      component: ProtectedRoute(AboutPage, 'ANONYMOUS_USERS'),
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
    {
      name: 'account-edit',
      path: '/account-edit',
      isExact: true,
      component: ProtectedRoute(EdditProfile, 'ANONYMOUS_USERS'),
    },
    {
      name: 'account-connected-socials',
      path: '/account-connected-socials',
      isExact: true,
      component: ProtectedRoute(ConnectedAccount, 'ANONYMOUS_USERS'),
    },
    {
      name: 'module',
      path: '/module/:id',
      isExact: false,
      component: ProtectedRoute(Module, 'ANONYMOUS_USERS'),
      childRoutes: [
        {
          name: 'module-tab',
          path: '/module/:id/:tabName',
          isExact: false,
          component: ProtectedRoute(ModuleTabContent, 'AUTHENTICATED_USERS'),
        },
      ],
    },
    {
      name: 'journey',
      path: '/journey/:id',
      isExact: true,
      component: ProtectedRoute(Journey, 'ANONYMOUS_USERS'),
    },
    {
      name: 'journey-info',
      path: '/journey-info',
      isExact: true,
      component: ProtectedRoute(JourneyInfo, 'ANONYMOUS_USERS'),
    },
    {
      name: 'task',
      path: '/task/:id',
      isExact: true,
      component: ProtectedRoute(Task, 'ANONYMOUS_USERS'),
    },
    {
      name: 'settings',
      path: '/settings',
      isExact: true,
      component: ProtectedRoute(Settings, 'ANONYMOUS_USERS'),
    },
    {
      name: 'notes',
      path: '/notes',
      isExact: true,
      component: ProtectedRoute(Notes, 'ANONYMOUS_USERS'),
    },
    {
      name: 'note-details',
      path: '/note-details/:id',
      isExact: true,
      component: ProtectedRoute(NoteDetails, 'ANONYMOUS_USERS'),
    },
    {
      name: 'ask-question',
      path: '/ask-question',
      isExact: true,
      component: ProtectedRoute(SubmitQuestion, 'ANONYMOUS_USERS'),
    },
    {
      name: 'article',
      path: '/article/:id',
      isExact: true,
      component: ProtectedRoute(Article, 'ANONYMOUS_USERS'),
    },
    {
      name: 'read-more',
      path: '/read-more',
      isExact: true,
      component: ProtectedRoute(ReadMore, 'ANONYMOUS_USERS'),
    },
    {
      name: 'expert-help',
      path: '/expert-help',
      isExact: true,
      component: ProtectedRoute(ExpertHelp, 'ANONYMOUS_USERS'),
    },
    {
      name: 'privacy-policy',
      path: '/privacy-policy',
      isExact: true,
      component: ProtectedRoute(PrivacyPolicy, 'ANONYMOUS_USERS'),
    },
    {
      name: 'terms',
      path: '/terms',
      isExact: true,
      component: ProtectedRoute(Terms, 'ANONYMOUS_USERS'),
    },
    {
      name: 'checkout',
      path: '/journey/:id/checkout',
      isExact: false,
      component: ProtectedRoute(Checkout, 'ANONYMOUS_USERS'),
    },
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

  private findActiveRoute(path: string, exact?: boolean): IRoute | undefined {
    return this.schema.find(({ path: routePath }) =>
      matchPath(routePath, { path, exact }),
    );
  }

  private findRouteInArray(
    routes: IRoute[],
    routeName: Pages,
  ): IRoute | undefined {
    for (const route of routes) {
      if (route.name === routeName) {
        return route;
      }
      if (route.childRoutes && route.childRoutes.length) {
        const foundRoute = this.findRouteInArray(route.childRoutes, routeName);
        if (foundRoute) {
          return foundRoute;
        }
      }
    }
  }

  private findRouteByName(name: Pages): IRoute | undefined {
    const route = this.findRouteInArray(this.schema, name);
    if (route) {
      return route;
    }
    return undefined;
  }

  public get getSchema() {
    return this.schema;
  }

  public getSchemaItem(name: Pages): IRoute | undefined {
    const route = this.findRouteByName(name);

    if (route && route.path) {
      return route;
    }
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
