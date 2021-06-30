import { Config } from '@app/config/API';

// helpers for headers etc
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';

// interfaces
import { IUserDataExtended } from '../models';

class API {
  public async updateUserAfterLogIn(
    userData: any,
    accessToken: string,
  ): Promise<IUserDataExtended | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user/data');

    const formData: any = new FormData();
    for (const [key, value] of Object.entries(userData)) {
      formData.append(key, value);
    }
    return handleErrors(
      fetch(url.toString(), {
        method: 'PUT',
        headers: {
          ...authHeader(accessToken),
        },
        body: formData,
      }),
    );
  }
}
export const UpdateUserApi = new API();
