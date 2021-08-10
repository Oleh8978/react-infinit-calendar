import bell from './static/bell.svg';
import more from './static/more.svg';
import account from './static/account.svg';

export const notifications = {
  icon: bell,
  name: 'Notifications',
  items: [
    {
      name: 'SMS notification',
      subname: 'sms',
      button: 'toogle',
    },
    {
      name: 'Email notification',
      subname: 'email',
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
      link: 'account-edit',
    },
    {
      name: 'Connect accounts for authentication',
      button: 'next',
      link: 'account-connected-socials',
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
      link: 'about',
    },
    {
      name: 'hello@meetfrasier.com',
    },
  ],
};

export const About = {
  items: [
    {
      name: 'Privacy policy',
      button: 'next',
      link: 'privacy-policy',
    },
    {
      name: 'Terms of use',
      button: 'next',
      link: 'terms',
    },
  ],
};
