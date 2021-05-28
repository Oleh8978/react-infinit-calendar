export const PersonalInfo = {
  name: 'Personal info',
  details: [
    {
      name: 'First name',
      isRequired: true,
    },
    {
      name: 'Last name',
      isRequired: true,
    },
    {
      name: 'Email',
      isRequired: true,
    },
    {
      name: 'Phone',
      isRequired: true,
    },
  ],
};

export const BillingAddress = {
  name: 'Billing Address',
  details: [
    {
      name: 'Street',
      isRequired: false,
    },
    {
      name: 'City',
      isRequired: false,
    },
    {
      name: 'State',
      isRequired: false,
    },
    {
      name: 'Zip Code',
      isRequired: false,
    },
  ],
};

export const TimingSettings = {
  name: 'Timing settings',
  details: [
    {
      name: 'Time zone',
      isRequired: false,
    },
    {
      name: 'Workday start time',
      isRequired: false,
    },
  ],
};

// social media links

export const socialMediInfo = [
  { name: 'Google' },
  { name: 'LinkedIn' },
  { name: 'Facebook' },
];
