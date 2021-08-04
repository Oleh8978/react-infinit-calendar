import {
  ArticleGetResponse,
  DayOffCreateRequest,
  DayOffDeleteRequest,
  DayOffDeleteResponse,
  DayOffGetListRequest,
  DayOffGetListResponse,
  TimeSlotGetListRequest,
} from '@ternala/frasier-types';
import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';
import { appendSearchParams } from '@app/utils/appendSearchParams';

class API {
  public async getTimeSlots(
    { date, ...data }: TimeSlotGetListRequest,
    accessToken: string,
  ): Promise<ArticleGetResponse | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + `time-slot/list-by-days`);

    url = appendSearchParams(url, data);
    if (date) url.searchParams.append('date', String(date));

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
    let url = new URL(
      Config.MAIN_SERVICE_ENDPOINT + `time-slot/list-previously-uncompleted`,
    );

    url = appendSearchParams(url, data);
    if (date) url.searchParams.append('date', String(date));

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async getDaysOff(
    { ...data }: DayOffGetListRequest,
    accessToken: string,
  ): Promise<DayOffGetListResponse | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + `day-off/list`);

    url = appendSearchParams(url, data);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async setDayOff(
    { ...data }: DayOffCreateRequest,
    accessToken: string,
  ): Promise<ArticleGetResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `day-off/create`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          date: data.date,
        }),
        headers: {
          'Content-type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async deleteDayOff(
    data: DayOffDeleteRequest,
    accessToken: string,
  ): Promise<DayOffDeleteResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `day-off/delete`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'DELETE',
        body: JSON.stringify({
          ids: data.ids,
        }),
        headers: {
          'Content-type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }
}
export const ScheduleAPI = new API();
