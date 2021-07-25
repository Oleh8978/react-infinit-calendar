// enum
import { TimezoneTypeEnum } from '@ternala/frasier-types/lib/constants/main';

export const PersonalInfo = {
  name: 'Personal info',
  details: [
    {
      name: 'First name',
      nameP: 'John',
      isRequired: true,
      subname: 'firstName',
    },
    {
      name: 'Last name',
      nameP: 'Johnson',
      isRequired: true,
      subname: 'lastName',
    },
    {
      name: 'Email',
      nameP: 'email@email.com',
      isRequired: true,
      isEmail: true,
      subname: 'email',
    },
    {
      name: 'Phone',
      nameP: '232-131-2312',
      isRequired: true,
      phone: 'phone',
      subname: 'phone',
    },
  ],
};

export const BillingAddress = {
  name: 'Billing Address',
  details: [
    {
      name: 'Street',
      nameP: 'Sesame',
      isRequired: false,
      subname: 'street',
    },
    {
      name: 'City',
      nameP: 'Seattle',
      isRequired: false,
      subname: 'city',
    },
    {
      name: 'State',
      nameP: 'Washington',
      isRequired: false,
      subname: 'state',
    },
    {
      name: 'Zip Code',
      nameP: '98101',
      isRequired: false,
      subname: 'zipCode',
    },
  ],
};

export const TimingSettings = {
  name: 'Timing settings',
  details: [
    {
      name: 'Time zone',
      isRequired: false,
      isSelect: true,
      subname: 'timezone',
    },
    {
      name: 'Workday start time',
      default: 600,
      isRequired: false,
      subname: 'startTime',
    },
  ],
};

// social media links

export const socialMediInfo = [
  { name: 'Google' },
  { name: 'LinkedIn' },
  { name: 'Facebook' },
];

// time zones

export const aryIannaTimeZones = [
  {
    offset: 'UTC-10',
    subname: TimezoneTypeEnum.Hawai,
    name: 'Hawai',
  },
  {
    offset: 'UTC-8',
    subname: TimezoneTypeEnum.Anchorage,
    name: 'Anchorage',
  },
  {
    offset: 'UTC-7',
    subname: TimezoneTypeEnum.LosAngeles,
    name: 'Los-Angeles',
  },
  {
    offset: 'UTC-6',
    subname: TimezoneTypeEnum.Denver,
    name: 'Denver',
  },
  {
    offset: 'UTC-5',
    subname: TimezoneTypeEnum.Chicago,
    name: 'Chicago',
  },
  {
    offset: 'UTC-4',
    subname: TimezoneTypeEnum.NewYork,
    name: 'New-York',
  },
  {
    offset: 'UTC-4',
    subname: TimezoneTypeEnum.Santiago,
    name: 'Santiago',
  },
];

