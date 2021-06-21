import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '../../../config/API';
import { authHeader, handleErrors, refreshHeader } from 'utils/API';

// cfunctionality
import { appendSearchParams } from 'utils/appendSearchParams';

// models
import { IDiscoverySearchParams } from '../model';

class API {
  public async getDiscovery(
    discoverySearchParams: IDiscoverySearchParams,
    accessToken: string,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    let url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'discovery/list');

    url = appendSearchParams(url, discoverySearchParams);

    if (Array.isArray(discoverySearchParams['ids'])) {
      discoverySearchParams['ids']?.forEach((item) => {
        url.searchParams.append(`${'ids'}[]`, String(item));
      });
    }

    if (Array.isArray(discoverySearchParams['categories'])) {
      discoverySearchParams['categories']?.forEach((item) => {
        url.searchParams.append(`${'categories'}[]`, String(item));
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
}
export const DiscoveryAPI = new API();
