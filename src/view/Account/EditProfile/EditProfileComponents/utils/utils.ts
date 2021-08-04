// enum
import { TimezoneTypeEnum } from '@ternala/frasier-types/lib/constants/main';

export const entryValidator = (name: string, text: string) => {
  switch (name) {
    case 'firstName':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'lastName':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'image':
      break;
    case 'email':
      return text.toLowerCase().replace(/[$&+,:;=?#|'<>^*()%!]/g, '');
    case 'phone':
      return text.toLowerCase().replace(/[^0-9+()]+/g, '');
    case 'timezone':
      break;
    case 'street':
      return text.replace(/[$&+,:;=?@#|'<>^*()%!]/g, '');
    case 'zipCode':
      return text.replace(/[^0-9]+/g, '');
    case 'city':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'state':
      return text.replace(/[^a-zA-Z ]/g, '');
    case 'startTime':
      return text;
    default:
      return text.trim();
  }
};

export const timeZoneReturner = (elem: any) => {
  let value: TimezoneTypeEnum;
  switch (elem) {
    case 'Pacific/Honolulu':
      value = TimezoneTypeEnum.Hawai;
      break;
    case 'America/Los_Angeles':
      value = TimezoneTypeEnum.LosAngeles;
      break;
    case 'America/Chicago':
      value = TimezoneTypeEnum.Chicago;
      break;
    case 'America/New_York':
      value = TimezoneTypeEnum.NewYork;
      break;
    case 'America/Anchorage':
      value = TimezoneTypeEnum.Anchorage;
      break;
    case 'America/Denver':
      value = TimezoneTypeEnum.Denver;
      break;
    case 'America/Denver':
      value = TimezoneTypeEnum.Denver;
      break;
    case 'America/Santiago':
      value = TimezoneTypeEnum.Santiago;
      break;
    default:
      value = TimezoneTypeEnum.Hawai;
  }
  return value;
};
