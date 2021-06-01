import { Pages } from '../Routing/schema';
import { FunctionComponent } from 'react';
import DiscoveryIcon from 'Component/icon/DiscoveryIcon';
import ScheduleIcon from 'Component/icon/ScheduleIcon';
import AccountIcon from 'Component/icon/AccountIcon';

export const appName = 'FrasierApp';

export type loginType = 'facebook' | 'google' | 'linkedin';

export type typeOfId = number;

export const googleClientId =
  '599666832664-acvms6soa4bauccrei1tkofgb19u6ru6.apps.googleusercontent.com';
export const facebookAppId = '3868253009934609';

interface IMenuItem {
  title: string;
  name: Pages;
  icon: FunctionComponent<any>;
}

export const menuItems: IMenuItem[] = [
  {
    title: 'Discovery',
    name: 'discovery',
    icon: DiscoveryIcon,
  },
  {
    title: 'Schedule',
    name: 'schedule',
    icon: ScheduleIcon,
  },
  {
    title: 'Me',
    name: 'account',
    icon: AccountIcon,
  },
];

export const routsWhereShowMenu = ['account', 'schedule', 'discovery'];
