import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { discoveryEntityTypeEnum } from '@ternala/frasier-types/lib/constants/main';
// interfaces 
import { DiscoveryDTO } from '@ternala/frasier-types';

export interface IException {
  code: string;
  message: string;
  name?: string;
}

export interface IDiscoveryState {
  discoveryList: IDiscoveryObject;
  storedSearchParams: null | IDiscoverySearchParams;
  isLoading: boolean;
  anyErrors: boolean;
  error: string | undefined;
}

export interface IDiscoveryObject {
  counts: number;
  items: DiscoveryDTO[];
}

export interface IItemList {
  article?: IArticle;
  journey?: IJourney;
  createdAt: createdAtSortFieldEnum;
  type: discoveryEntityTypeEnum;
}

export interface IArticle {
  id?: number;
  title?: string;
  image?: string;
  appearance?: string;
  startShowingDate?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface IJourney {
  workDays?: number[];
  id?: number;
  title?: string;
  subTitle?: string;
  accentColor?: string;
  image?: string;
  trialPeriod?: number;
  isNeedPaid?: boolean;
  price?: number;
  isDefaultForNew?: boolean;
  startShowingDate?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface IDiscoverySearchParams {
  limit?: string | number;
  offset?: string | number;
  query?: string | number;
  sortType?: string;
  type?: string;
  categories?: string[] | string;
  sortField?: createdAtSortFieldEnum;
  ids?: string[] | string;
}
