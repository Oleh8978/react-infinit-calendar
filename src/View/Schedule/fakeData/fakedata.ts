export const data = {
  date: 'Mon Apr 26 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',

  tasks: [
    {
      date: 'Mon Apr 26 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'completed',
      description:
        'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
      time: 200,
    },
    {
      date: 'Mon Apr 26 2021 22:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'uncompleted',
      description:
        'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
      time: 100,
    },
    {
      date: 'Mon Apr 26 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
      status: 'completed',
      description:
        'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
      time: 100,
    },
  ],
};

export const prevDataUncompleted = [
  {
    date: 'Mon Apr 22 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date:
          'Mon Apr 22 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Check etc...',
      },
      {
        date:
          'Mon Apr 22 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Check etc...',
      },
    ],
  },
  {
    date: 'Mon Apr 20 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date:
          'Mon Apr 20 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Just simple data',
      },
    ],
  },
  {
    date: 'Mon Apr 9 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
    tasks: [
      {
        date: 'Mon Apr 9 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
        description: 'Test 2',
      },
    ],
  },
];

export const events = [
  {
    day: 'Mon Apr 26 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: false,
    hasAnyEvents: true,
    events: [{
      date: 'Mon Apr 26 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',

      tasks: [
        {
          date:
            'Mon Apr 26 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
          status: 'completed',
          description:
            'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
          time: 200,
        },
        {
          date:
            'Mon Apr 26 2021 22:13:44 GMT+0300 (Eastern European Summer Time)',
          status: 'uncompleted',
          description:
            'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
          time: 100,
        },
        {
          date:
            'Mon Apr 2 2021 23:13:44 GMT+0300 (Eastern European Summer Time)',
          status: 'completed',
          description:
            'Thinking About Plans for the Week About Plans for the  week About Plans for the ... ',
          time: 100,
        },
      ],
    },]
  },

  {
    day: 'Mon Apr 24 2021 13:13:44 GMT+0300 (Eastern European Summer Time)',
    isHolidays: true,
    hasAnyEvents: true,
    typeOfHolidays: 'Martin Luther King, Jr. Day',
    events: []
  }
];

export const holidays = [{ title: 'Martin Luther King, Jr. Day' }];
