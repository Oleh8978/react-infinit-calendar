import { HolidayGetListResponse, HolidayGetResponse } from '@ternala/frasier-types';
import { Config } from '../../../Config/API';
import { authHeader, handleErrors } from '../../../utils/API';
import { appendSearchParams } from '../../../utils/appendSearchParams';
import { IHolidayListSearchParams } from '../models';

class API {
  public async getHoliday(
    holidaySearchParams: IHolidayListSearchParams,
    accessToken: string,
  ): Promise<HolidayGetResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `holiday/list`);

    // url = appendSearchParams(url, holidaySearchParams);
    //
    // if (Array.isArray(holidaySearchParams['ids'])) {
    //   holidaySearchParams['ids']?.forEach((item) => {
    //     url.searchParams.append(`${'ids'}[]`, String(item));
    //   });
    // }

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
}
export const HolidayAPI = new API();
