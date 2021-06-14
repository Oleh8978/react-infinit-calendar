import { ComponentType, ComponentProps } from 'react';
import ProtectedRoute from 'Routing/ProtectedRoute';
import { RouteComponentProps } from 'react-router-dom';

//Views
import Discovery from 'View/Discovery';
import NotFound from 'View/Static/NotFound';
import Schedule from 'View/Schedule';
import Account from 'View/Account';
import Module from 'View/Module';
import Journey from 'View/Journey/index';
import TaskInfo from 'View/Module/MenuSections/Tasks/TaskInfo';
import JourneyInfo from 'View/Account/JourneyInfo/index';
import Settings from 'View/Account/Settings/index';
import Notes from 'View/Account/Notes/index';
import SubmitQuestion from 'View/Discovery/SubmitQuestion/SubmitQuestion';
import Article from 'View/Discovery/Article/index';
import ReadMore from 'View/Module/MenuSections/ReadMore/ReadMore';
import ExpertHelp from 'View/Module/MenuSections/ExpertHelp/ExpertHelp';
import NoteDetails from 'View/Account/Notes/NoteDetails/index';
import EdditProfile from 'View/Account/EditProfile/index';
import ConnectedAccount from 'View/Account/ConnectedAccount/index';
import AboutPage from 'View/Account/About/index';
import PrivacyPolicy from '../Component/PrivacyPolicy';
import Terms from '../Component/Terms';

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
  | 'linkedin'
  | 'discovery'
  | 'schedule'
  | 'module'
  | 'module-tasks'
  | 'module-help'
  | 'module-notes'
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
      path: '/module',
      isExact: true,
      component: ProtectedRoute(Module, 'ANONYMOUS_USERS'),
    },
    {
      name: 'journey',
      path: '/journey',
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
      path: '/task',
      isExact: true,
      component: ProtectedRoute(TaskInfo, 'ANONYMOUS_USERS'),
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
