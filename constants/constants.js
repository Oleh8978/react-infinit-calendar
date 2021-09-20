import { Dimensions } from 'react-native';

export const SERVER_URL = 'test-api.rhino.global';
export const APPLICATION_DATE = new Date('2021-01-01');
export const EMAIL = 'tech@rhino.global';
export const WEB = 'https://www.rhino.global';
export const MINIMUM_WITHDRAW_CREDIT = 500;
export const BTC_FRACTAL_SYMBOLS = 8;
export const ETH_FRACTAL_SYMBOLS = 10;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const USA_STATES_LIST = [
  { value: 'AK', name: 'Alaska' },
  { value: 'AL', name: 'Alabama' },
  { value: 'AR', name: 'Arkansas' },
  { value: 'AZ', name: 'Arizona' },
  { value: 'CA', name: 'California' },
  { value: 'CO', name: 'Colorado' },
  { value: 'CT', name: 'Connecticut' },
  { value: 'DC', name: 'Washington DC' },
  { value: 'DE', name: 'Delaware' },
  { value: 'FL', name: 'Florida' },
  { value: 'GA', name: 'Georgia' },
  { value: 'GU', name: 'Guam' },
  { value: 'HI', name: 'Hawaii' },
  { value: 'IA', name: 'Iowa' },
  { value: 'ID', name: 'Idaho' },
  { value: 'IL', name: 'Illinois' },
  { value: 'IN', name: 'Indiana' },
  { value: 'KS', name: 'Kansas' },
  { value: 'KY', name: 'Kentucky' },
  { value: 'LA', name: 'Louisiana' },
  { value: 'MA', name: 'Massachusetts' },
  { value: 'MD', name: 'Maryland' },
  { value: 'ME', name: 'Maine' },
  { value: 'MI', name: 'Michigan' },
  { value: 'MN', name: 'Minnesota' },
  { value: 'MO', name: 'Missouri' },
  { value: 'MS', name: 'Mississippi' },
  { value: 'MT', name: 'Montana' },
  { value: 'NC', name: 'North Carolina' },
  { value: 'ND', name: 'North Dakota' },
  { value: 'NE', name: 'Nebraska' },
  { value: 'NH', name: 'New Hampshire' },
  { value: 'NJ', name: 'New Jersey' },
  { value: 'NM', name: 'New Mexico' },
  { value: 'NV', name: 'Nevada' },
  { value: 'NY', name: 'New York' },
  { value: 'OH', name: 'Ohio' },
  { value: 'OK', name: 'Oklahoma' },
  { value: 'OR', name: 'Oregon' },
  { value: 'PA', name: 'Pennsylvania' },
  { value: 'PR', name: 'Puerto Rico' },
  { value: 'RI', name: 'Rhode Island' },
  { value: 'SC', name: 'South Carolina' },
  { value: 'SD', name: 'South Dakota' },
  { value: 'TN', name: 'Tennessee' },
  { value: 'TX', name: 'Texas' },
  { value: 'UT', name: 'Utah' },
  { value: 'VA', name: 'Virginia' },
  { value: 'VI', name: 'Virgin Islands' },
  { value: 'VT', name: 'Vermont' },
  { value: 'WA', name: 'Washington' },
  { value: 'WI', name: 'Wisconsin' },
  { value: 'WV', name: 'West Virginia' },
  { value: 'WY', name: 'Wyoming' },
  { value: 'AA', name: 'Armed Forces America' },
  { value: 'AP', name: 'Armed Forces Pacific' },
  { value: 'AE', name: 'Armed Forces' },
];
export const ID_DOCUMENTS_LIST = [
  { value: 'drivers_license', name: 'Drivers License' },
  { value: 'government_id', name: 'Government Id' },
  { value: 'passport', name: 'Passport' },
  { value: 'residence_permit', name: 'Residence Permit' },
  { value: 'utility_bill', name: 'Utility Bill' },
  { value: 'other', name: 'Other' },
];

// Don`t add USD! It might create bugs
export const AVAILABLE_COINS = [{ value: 'BTC', name: 'Bitcoin' }];
