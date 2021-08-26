import { Config } from '@app/config/API';
import { handleErrors } from '@app/utils/API';

//interfaces

class API {
  public async getSurveyTitle(id: number): Promise<boolean | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + 'survey/' + id);

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  }
}
export const getSurveyInfoAPI = new API();
