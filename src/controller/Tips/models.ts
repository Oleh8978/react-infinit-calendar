import { tipSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { TipDTO, TipSendDTO } from '@ternala/frasier-types';
import { GetListParameters } from '@ternala/frasier-types/lib/modules/query.dto';

export interface ITipsSearchParams {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  survey?: string[] | string;
  sortField?: tipSortFieldEnum;
  ids?: string[] | string;
}

export interface IGetListRequest {
  searchParams: GetListParameters;
  userId: string;
}

export interface ISetLoadingAction {
  status: boolean;
  isAnyErrors: boolean;
  error: string;
}

export interface ItipItems {
  itemsCount: number;
  items: TipSendDTO[];
  newItemsCount: number;
}

export interface ITipsState {
  tips: ItipItems;
  storedSearchParams: ITipsSearchParams;
  loaderState: ISetLoadingAction;
}

export interface IPostReadedTips {
  accessToken: string,
  readedIds: string[] | number[]
}
