import { UserDataFullDTO } from '@ternala/frasier-types';

import { Config } from '../../../Config/API';

// helpers for headers etc
import { authHeader, handleErrors, refreshHeader } from '../../../utils/API';

// interfaces 
import { IUserDataExtended } from '../models';

class API {
  public async updateUserAfterLogIn(
    userData: IUserDataExtended,
  ): Promise<IUserDataExtended | string> {
    console.log('Config.MAIN_SERVICE_ENDPOINT', Config.MAIN_SERVICE_ENDPOINT)
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'user-data/update');

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }),
    );
  }
}
export const UpdateUserApi = new API();
