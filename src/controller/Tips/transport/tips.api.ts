import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

// cfunctionality
import { appendSearchParams } from '@app/utils/appendSearchParams';
//interfaces
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';
import { ITipsSearchParams } from '../models';

class API {
  public async getListTipsApi(
    tipsSearchParams: GetListParameters,
    userId: string,
    accessToken: string,
  ): Promise<boolean | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'tip-send/list');

    // url = appendSearchParams(url, tipsSearchParams);

    if (Array.isArray(tipsSearchParams['ids'])) {
      tipsSearchParams['ids']?.forEach((item) => {
        url.searchParams.append(`${'ids'}[]`, String(item));
      });
    }

    if (Array.isArray(tipsSearchParams['user'])) {
      url.searchParams.append(`${userId}`, String(tipsSearchParams['user']));
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

  public async setReadTipsAPI(
    accessToken: string,
    readedIds: number[] | string[],
  ): Promise<boolean | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'tip-send/read');

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: readedIds,
        }),
      }),
    );
  }
}
export const tipsApi = new API();
