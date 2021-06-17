import { HolidayGetListResponse } from '@ternala/frasier-types';
import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';

export interface IException {
  code: string | null;
  message: string | null;
  name: string | null;
}

export interface IHolidayState {
  holidayObject: HolidayGetListResponse;
  Loader: ILoader;
}

export interface ILoader {
  code?: number | undefined | string;
  message?: string;
  isLoading: boolean;
  error?: boolean;
}

export interface IHolidayListSearchParams {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  sortField?: createdAtSortFieldEnum;
  ids?: string[] | string;
}
