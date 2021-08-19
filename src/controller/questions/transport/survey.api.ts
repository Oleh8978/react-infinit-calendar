import { Config } from '@app/config/API';
import { authHeader, handleErrors } from '@app/utils/API';

// cfunctionality
import { appendSearchParams } from '@app/utils/appendSearchParams';

//interfaces
import { ISurveySearchParams, ISurveyAnswer } from '../models';

class API {
  public async getSurveys(
    surveysSearchParams: ISurveySearchParams,
    accessToken: string,
    id: number,
  ): Promise<boolean | string> {
    let url = new URL(
      Config.MAIN_SERVICE_ENDPOINT +
        'question/list?sortType=DESC&' +
        'survey=' +
        id,
    );

    url = appendSearchParams(url, surveysSearchParams);

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

  public async postSurveyResults(
    accessToken: string,
    questionResults: ISurveyAnswer[],
    id: number,
  ): Promise<boolean | string> {
    const url = new URL(
      Config.MAIN_SERVICE_ENDPOINT + 'survey-complete/create',
    );

    return handleErrors(
      fetch(url.toString(), {
        method: 'POST',
        headers: {
          ...authHeader(accessToken),
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          survey: id,
          questionResults: questionResults,
        }),
      }),
    );
  }
}
export const getSurveysAPI = new API();
