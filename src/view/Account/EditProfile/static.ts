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
      subname: 'phone'
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
      default: '9:00 AM',
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
    offset: "GMT-11:00",
    name: "Midway"
  },
  {
    offset: "GMT-10:00",
    name: "Adak"
  },
  {
    offset: "GMT-09:00",
    name: "Anchorage"
  },
  {
    offset: "GMT-09:00",
    name: "Gambier"
  },
  {
    offset: "GMT-08:00",
    name: "Dawson-Creek"
  },
  {
    offset: "GMT-08:00",
    name: "Ensenada"
  },
  {
    offset: "GMT-08:00",
    name: "Los-Angeles"
  },
  {
    offset: "GMT-07:00",
    name: "Chihuahua"
  },
  {
    offset: "GMT-07:00",
    name: "Denver"
  },
  {
    offset: "GMT-06:00",
    name: "Belize"
  },
  {
    offset: "GMT-06:00",
    name: "Cancun"
  },
  {
    offset: "GMT-06:00",
    name: "Chicago"
  },
  {
    offset: "GMT-06:00",
    name: "EasterIsland"
  },
  {
    offset: "GMT-05:00",
    name: "Bogota"
  },
  {
    offset: "GMT-05:00",
    name: "Havana"
  },
  {
    offset: "GMT-05:00",
    name: "New-York"
  },
  {
    offset: "GMT-04:30",
    name: "Caracas"
  },
  {
    offset: "GMT-04:00",
    name: "Campo-Grande"
  },
  {
    offset: "GMT-04:00",
    name: "Glace-Bay"
  },
  {
    offset: "GMT-04:00",
    name: "Goose-Bay"
  },
  {
    offset: "GMT-04:00",
    name: "Santiago"
  },
  {
    offset: "GMT-04:00",
    name: "La-Paz"
  },
  {
    offset: "GMT-03:00",
    name: "Buenos-Aires"
  },
  {
    offset: "GMT-03:00",
    name: "Montevideo"
  },
  {
    offset: "GMT-03:00",
    name: "Araguaina"
  },
  {
    offset: "GMT-03:00",
    name: "Godthab"
  },
  {
    offset: "GMT-03:00",
    name: "Miquelon"
  },
  {
    offset: "GMT-03:00",
    name: "Sao-Paulo"
  },
  {
    offset: "GMT-03:30",
    name: "St-Johns"
  },
  {
    offset: "GMT-02:00",
    name: "Noronha"
  },
  {
    offset: "GMT-01:00",
    name: "Cape-Verde"
  },
  {
    offset: "GMT+00:00",
    name: "Belfast"
  },
  {
    offset: "GMT+00:00",
    name: "Abidjan"
  },
  {
    offset: "GMT+00:00",
    name: "Dublin"
  },
  {
    offset: "GMT+00:00",
    name: "Lisbon"
  },
  {
    offset: "GMT+00:00",
    name: "London"
  },
  {
    offset: "GMT+01:00",
    name: "Algiers"
  },
  {
    offset: "GMT+01:00",
    name: "Windhoek"
  },
  {
    offset: "GMT+01:00",
    name: "Azores"
  },
  {
    offset: "GMT+01:00",
    name: "Stanley"
  },
  {
    offset: "GMT+01:00",
    name: "Amsterdam"
  },
  {
    offset: "GMT+01:00",
    name: "Belgrade"
  },
  {
    offset: "GMT+01:00",
    name: "Brussels"
  },
  {
    offset: "GMT+02:00",
    name: "Cairo"
  },
  {
    offset: "GMT+02:00",
    name: "Blantyre"
  },
  {
    offset: "GMT+02:00",
    name: "Beirut"
  },
  {
    offset: "GMT+02:00",
    name: "Damascus"
  },
  {
    offset: "GMT+02:00",
    name: "Gaza"
  },
  {
    offset: "GMT+02:00",
    name: "Jerusalem"
  },
  {
    offset: "GMT+03:00",
    name: "Addis-Ababa"
  },
  {
    offset: "GMT+03:00",
    name: "Riyadh89"
  },
  {
    offset: "GMT+03:00",
    name: "Minsk"
  },
  {
    offset: "GMT+03:30",
    name: "Tehran"
  },
  {
    offset: "GMT+04:00",
    name: "Dubai"
  },
  {
    offset: "GMT+04:00",
    name: "Yerevan"
  },
  {
    offset: "GMT+04:00",
    name: "Moscow"
  },
  {
    offset: "GMT+04:30",
    name: "Kabul"
  },
  {
    offset: "GMT+05:00",
    name: "Tashkent"
  },
  {
    offset: "GMT+05:30",
    name: "Kolkata"
  },
  {
    offset: "GMT+05:45",
    name: "Katmandu"
  },
  {
    offset: "GMT+06:00",
    name: "Dhaka"
  },
  {
    offset: "GMT+06:00",
    name: "Yekaterinburg"
  },
  {
    offset: "GMT+06:30",
    name: "Rangoon"
  },
  {
    offset: "GMT+07:00",
    name: "Bangkok"
  },
  {
    offset: "GMT+07:00",
    name: "Novosibirsk"
  },
  {
    offset: "GMT+08:00",
    name: "Hong-Kong"
  },
  {
    offset: "GMT+08:00",
    name: "Krasnoyarsk"
  },
  {
    offset: "GMT+08:00",
    name: "Perth"
  },
  {
    offset: "GMT+08:45",
    name: "Eucla"
  },
  {
    offset: "GMT+09:00",
    name: "Irkutsk"
  },
  {
    offset: "GMT+09:00",
    name: "Seoul"
  },
  {
    offset: "GMT+09:00",
    name: "Tokyo"
  },
  {
    offset: "GMT+09:30",
    name: "Adelaide"
  },
  {
    offset: "GMT+09:30",
    name: "Darwin"
  },
  {
    offset: "GMT+09:30",
    name: "Marquesas"
  },
  {
    offset: "GMT+10:00",
    name: "Brisbane"
  },
  {
    offset: "GMT+10:00",
    name: "Hobart"
  },
  {
    offset: "GMT+10:00",
    name: "Yakutsk"
  },
  {
    offset: "GMT+10:30",
    name: "Lord-Howe"
  },
  {
    offset: "GMT+11:00",
    name: "Vladivostok"
  },
  {
    offset: "GMT+11:30",
    name: "Norfolk"
  },
  {
    offset: "GMT+12:00",
    name: "Anadyr"
  },
  {
    offset: "GMT+12:00",
    name: "Magadan"
  },
  {
    offset: "GMT+12:00",
    name: "Auckland"
  },
  {
    offset: "GMT+12:45",
    name: "Chatham"
  },
  {
    offset: "GMT+13:00",
    name: "Tongatapu"
  },
  {
    offset: "GMT+14:00",
    name: "Kiritimati"
  }
]
