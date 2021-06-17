import {
  HolidayExcludeCreateRequest,
  HolidayExcludeCreateResponse,
  HolidayGetResponse,
} from '@ternala/frasier-types';

// Config
import { Config } from 'Config/API';

// Utils
import { authHeader, handleErrors } from 'Utils/API';
import { appendSearchParams } from 'Utils/appendSearchParams';

// Interfaces
import { IHolidayListSearchParams } from '../models';

class API {
  public async getHoliday(
    holidaySearchParams: IHolidayListSearchParams,
    accessToken: string,
  ): Promise<HolidayGetResponse | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + `holiday/list`);

    url = appendSearchParams(url, holidaySearchParams);

    if (Array.isArray(holidaySearchParams['ids'])) {
      holidaySearchParams['ids']?.forEach((item) => {
        url.searchParams.append(`${'ids'}[]`, String(item));
      });
    }

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  public async createExclude(
    data: HolidayExcludeCreateRequest,
    accessToken: string,
  ): Promise<HolidayExcludeCreateResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `holiday-exclude/create`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          holiday: data.holiday
        }),
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
      }),
    );
  }
}
export const HolidayAPI = new API();
