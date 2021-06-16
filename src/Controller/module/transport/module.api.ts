import {
  ArticleGetResponse, ModuleGetResponse,
  TimeSlotGetListByModuleRequest,
  TimeSlotGetListExpandedResponse,
  TimeSlotGetListRequest, TimeSlotGetPreviouslyUncompletedListRequest,
} from '@ternala/frasier-types';
import { Config } from '../../../Config/API';
import { authHeader, handleErrors } from 'Utils/API';
import { appendSearchParams } from '../../../Utils/appendSearchParams';

class API {
  public async getModule(
    data: { id: number },
    accessToken: string,
  ): Promise<ModuleGetResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `module/${data.id}`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async getTimeSlots(
    { date, ...data }: TimeSlotGetListByModuleRequest,
    accessToken: string,
  ): Promise<TimeSlotGetListExpandedResponse | string> {
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
    { date, ...data }: TimeSlotGetPreviouslyUncompletedListRequest,
    accessToken: string,
  ): Promise<TimeSlotGetListExpandedResponse | string> {
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
export const ModuleApi = new API();
