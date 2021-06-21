import { UserDataFullDTO } from '@ternala/frasier-types';

import { Config } from '@app/config/API';

// helpers for headers etc
import { authHeader, handleErrors, refreshHeader } from '@app/utils/API';

// interfaces 
import { IUserDataExtended } from '../models';

class API {
  public async updateUserAfterLogIn(
    userData: IUserDataExtended,
    accessToken: string,
  ): Promise<IUserDataExtended | string> {
    console.log('user data ', userData)
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user/data');

    return handleErrors(
      fetch(url.toString(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader(accessToken)
        },
        body: JSON.stringify(userData),
      }),
    );
  }
}
export const UpdateUserApi = new API();
