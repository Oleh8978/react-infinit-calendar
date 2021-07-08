// enum
import { TimezoneTypeEnum } from '@ternala/frasier-types/lib/constants/main';

export const PersonalInfo = {
  name: 'Personal info',
  details: [
    {
      name: 'First name',
      isRequired: true,
      subname: 'firstName',
    },
    {
      name: 'Last name',
      isRequired: true,
      subname: 'lastName',
    },
    {
      name: 'Email',
      isRequired: true,
      isEmail: true,
      subname: 'email',
    },
    {
      name: 'Phone',
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
      isRequired: false,
      subname: 'street',
    },
    {
      name: 'City',
      isRequired: false,
      subname: 'city',
    },
    {
      name: 'State',
      isRequired: false,
      subname: 'state',
    },
    {
      name: 'Zip Code',
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
    offset: 'UTC-9',
    subname: TimezoneTypeEnum.Hawai,
    name: 'Hawai',
  },
  {
    offset: 'UTC-7',
    subname: TimezoneTypeEnum.LosAngeles,
    name: 'Los-Angeles',
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
];


    // Hawai = "Pacific/Honolulu",
    // Anchorage = "America/Anchorage",
    // LosAngeles = "America/Los_Angeles",
    // Denver = "America/Denver",
    // Chicago = "America/Chicago",
    // NewYork = "America/New_York",
    // Santiago = "America/Santiago"
