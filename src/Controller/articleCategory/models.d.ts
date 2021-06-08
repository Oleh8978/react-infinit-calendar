import {
  EnterpriseCreateRequest,
  EnterpriseFullWithTreeDTO,
  EnterpriseGetListRequest,
  EnterpriseUpdateRequest,
  EnterpriseGetListFilters,
} from '@ternala/fraisier-types';

export interface IException {
  code: string;
  message: string;
  name?: string;
}
