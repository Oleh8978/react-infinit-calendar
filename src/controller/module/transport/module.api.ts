import {
  ModuleGetResponse,
  TaskExecuteCreateRequest,
  TaskExecuteCreateResponse,
  TaskExecuteDeleteRequest,
  TaskExecuteDeleteResponse,
  TimeSlotGetListByModuleRequest,
  TimeSlotGetListExpandedResponse,
  TimeSlotGetPreviouslyUncompletedListRequest,
} from '@ternala/frasier-types';
import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';
import { appendSearchParams } from '@app/utils/appendSearchParams';

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

  public async createExecuteTask(
    data: TaskExecuteCreateRequest,
    accessToken: string,
  ): Promise<TaskExecuteCreateResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `task/execute/create`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify({
          task: data.task,
          purposeDate: data.purposeDate,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async deleteExecuteTask(
    data: TaskExecuteDeleteRequest,
    accessToken: string,
  ): Promise<TaskExecuteDeleteResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `task/execute/delete`);

    return handleErrors(
      fetch(url.toString(), {
        method: 'DELETE',
        body: JSON.stringify({
          task: data.task,
          purposeDate: data.purposeDate,
        }),
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(accessToken),
        },
      }),
    );
  }

  public async getTimeSlots(
    { date, module, ...data }: TimeSlotGetListByModuleRequest,
    accessToken: string,
  ): Promise<TimeSlotGetListExpandedResponse | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + `time-slot/list-by-days`);

    url = appendSearchParams(url, data);
    if (date) url.searchParams.append('date', String(date));
    if (module) url.searchParams.append('module', String(module));

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
    { date, module, ...data }: TimeSlotGetPreviouslyUncompletedListRequest,
    accessToken: string,
  ): Promise<TimeSlotGetListExpandedResponse | string> {
    let url = new URL(
      Config.MAIN_SERVICE_ENDPOINT + `time-slot/list-previously-uncompleted`,
    );

    url = appendSearchParams(url, data);
    if (date) url.searchParams.append('date', String(date));
    if (module) url.searchParams.append('module', String(module));

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
