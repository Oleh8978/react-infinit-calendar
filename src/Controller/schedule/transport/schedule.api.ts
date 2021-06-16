import { ArticleGetResponse, TimeSlotGetListRequest } from '@ternala/frasier-types';
import { Config } from '../../../Config/API';
import { authHeader, handleErrors } from 'Utils/API';
import { appendSearchParams } from '../../../Utils/appendSearchParams';

class API {
  public async getTimeSlots(
    { date, ...data }: TimeSlotGetListRequest,
    accessToken: string,
  ): Promise<ArticleGetResponse | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + `time-slot/list-by-days`);

    url = appendSearchParams(url, data);
    if(date) url.searchParams.append('date', String(date))

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }
  public async getUncompletedTimeSlots(
    { date, ...data }: TimeSlotGetListRequest,
    accessToken: string,
  ): Promise<ArticleGetResponse | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + `time-slot/list-previously-uncompleted`);

    url = appendSearchParams(url, data);
    if(date) url.searchParams.append('date', String(date))

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }
}
export const ScheduleAPI = new API();
