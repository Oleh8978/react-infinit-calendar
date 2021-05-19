import bell from './static/bell.png';
import more from './static/more.png';
import account from './static/account.png';

export const notifications = {
  icon: bell,
  name: 'Notifications',
  items: [
    {
      name: 'Push notification',
      button: 'toogle',
    },
    {
      name: 'E-mail notification',
      button: 'toogle',
    },
  ],
};

export const Account = {
  icon: account,
  name: 'Account',
  items: [
    {
      name: 'Edit profile ',
      button: 'next',
    },
    {
      name: 'Connect account for authentication',
      button: 'next',
    },
  ],
};

export const More = {
  icon: more,
  name: 'More',
  items: [
    {
      name: 'About this app',
      button: 'next',
    },
    {
      name: 'email@testmail.com',
    },
  ],
};
