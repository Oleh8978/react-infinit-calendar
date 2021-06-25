import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { JourneyDTO } from '@ternala/frasier-types';

export interface IJourneyListSearchParams {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  sortField?: createdAtSortFieldEnum;
  ids?: string[] | string;
}

export interface ILoader {
  code?: number | undefined | string;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}

export interface IException {
  code: string | null;
  message: string | null;
  name: string | null;
}

export interface IJourneyState {
  journey: JourneyDTO;
  Loader: ILoader;
}
