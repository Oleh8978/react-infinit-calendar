import { surveySortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';
import { QuestionGetListResponse, sortType } from '@ternala/frasier-types';

export interface ISetLoadingAction {
  status: boolean;
}

export interface ISurveySearchParams {
  limit?: number;
  offset?: number;
  query?: string;
  survey?: number;
  sortType?: any;
  sortField?: surveySortFieldEnum;
}

export interface IGetListRequest {
  searchParams: GetListParameters;
  survey: number;
}

export interface ISurveyState {
  surveys: QuestionGetListResponse;
  storedSearchParams: ISurveySearchParams;
  loaderState: ISetLoadingAction;
}

export interface ISurveyAnswer {
  answer: boolean;
  question: number;
}

export interface ISendSurveyResult {
  survey: number;
  questionResults: ISurveyAnswer[];
}
