import { TaskGetResponse } from '@ternala/frasier-types';
import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

class API {
  public async getTask(
    id: number,
    accessToken: string,
  ): Promise<TaskGetResponse | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + `task/${id}`);

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
export const TaskAPI = new API();
