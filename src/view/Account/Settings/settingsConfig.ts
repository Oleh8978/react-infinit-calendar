import bell from './static/bell.png';
import more from './static/more.png';
import account from './static/account.png';

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
      name: 'E-mail notification',
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
      link: 'account-edit'
    },
    {
      name: 'Connect account for authentication',
      button: 'next',
      link: 'account-connected-socials'
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
      link: 'about'
    },
    {
      name: 'email@testmail.com',
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
      link: 'terms'
    },
  ],
};
