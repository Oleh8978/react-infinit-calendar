import { HolidayGetListResponse } from '@ternala/frasier-types';
import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { HolidayDTO } from '@ternala/frasier-types/lib/modules/holiday/holiday.dto';

export interface IException {
  code: string | null;
  message: string | null;
  name: string | null;
}

export interface IHolidayState {
  holidays: HolidayDTO[];
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
