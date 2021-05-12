export const data = {
  date: 'Mon May 3 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',

  tasks: [
    {
      date: 'Mon May 3 26 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'completed',
      description:
        'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
      time: 200,
    },
    {
      date: 'Mon May 3 2021 22:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'uncompleted',
      description:
        'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
      time: 100,
    },
    {
      date: 'Mon May 3 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'completed',
      description:
        'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
      time: 100,
    },
  ],
};

export const prevDataUncompleted = [
  {
    date: 'Su May 2 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date:
          'Su May 2 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Check etc...',
      },
      {
        date:
          'Su May 2 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Check etc...',
      },
    ],
  },
  {
    date: 'Sa May 1 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date:
          'Sa May 1 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Just simple data',
      },
    ],
  },
];

export const events = [
  {
    day: 'Tu May 18 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: false,
    hasAnyEvents: true,
    events: [
      {
        date:
          'Tu May 18  2021 13:13:44 GMT+0300 (Eastern European Summer Time)',

        tasks: [
          {
            date:
              'Tu May 18  2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
            status: 'completed',
            description:
              'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
            time: 200,
          },
          {
            date:
              'Tu May 18  2021 22:13:44 GMT+0300 (Eastern European Summer Time)',
            status: 'uncompleted',
            description:
              'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
            time: 100,
          },
          {
            date:
              'Tu May 18  2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
            status: 'completed',
            description:
              'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
            time: 100,
          },
        ],
      },
    ],
  },

  {
    day: 'We May 19 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: true,
    hasAnyEvents: true,
    typeOfHolidays: 'Martin Luther King, Jr. Day',
    events: [],
  },
  {
    day: 'Sa May 1 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: true,
    hasAnyEvents: true,
    isDayOff: true,
    typeOfHolidays: 'Martin Luther King, Jr. Day',
    events: [],
  },
  {
    day: 'Su May 2 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: true,
    hasAnyEvents: false,
    isDayOff: false,
    typeOfHolidays: 'Martin Luther King, Jr. Day',
    events: [],
  },
  {
    day: 'Su May 9 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: false,
    hasAnyEvents: false,
    isDayOff: true,
    typeOfHolidays: 'Martin Luther King, Jr. Day',
    events: [],
  },

  {
    day: 'Mo May 31 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: false,
    hasAnyEvents: false,
    isDayOff: false,
    isTrialExpired: true,
    events: [],
  },

  {
    day: 'Fr May 14 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: false,
    hasAnyEvents: false,
    isDayOff: false,
    isTrialExpired: false,
    haseNoActiveJourneys: true,
    events: [],
  },

  {
    day: 'Th May 13 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: false,
    hasAnyEvents: false,
    isDayOff: false,
    isTrialExpired: false,
    haseNoActiveJourneys: true,
    events: [],
  },
];

export const holidays = [{ title: 'Martin Luther King, Jr. Day' }];
