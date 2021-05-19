export const data = {
  date: 'Mon Apr 25 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',

  tasks: [
    {
      date: 'Mon Apr 25 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'completed',
      description:
        'Marketing -Thinking About Plans for the Week About Plans for the  week About',
      time: 200,
    },
    {
      date: 'Mon Apr 25 2021 22:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'uncompleted',
      description:
        'Module Title - Time Slot Title',
      time: 100,
    },
    {
      date: 'Mon Apr 25 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'completed',
      description:
        'Accounting - Create a List of Calls for the Week ',
      time: 100,
    },
  ],
};

export const prevDataUncompleted = [
  {
    date: 'Mon May 10 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date:
          'Mon May 10  2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Hiring - Small Business Lawyer - Why and How to Hire One',
      },
      {
        date:
          'Mon May 10  2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Hiring - Why You Should Hire A Bookkeeper for Your Business',
      },
    ],
  },
  {
    date: 'Mon May 3 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date:
          'Mon May 3 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Legal',
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
