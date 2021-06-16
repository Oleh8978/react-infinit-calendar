import { AuthUserLoginByTokenResponseDTO } from '@ternala/frasier-types/lib/index';

import { Config } from '../../../Config/API';
import { authHeader, handleErrors, refreshHeader } from 'Utils/API';

// models 
import { createdAtSortFieldEnum } from '@ternala/frasier-types/lib/constants/sortFields';
import { IDiscoverySearchParams } from '../model';

// const searchParams: IDiscoverySearchParams = {
//   limit: '24',
//   offset: '24',
//   query: '24',
//   sortType: 'ASC', // DESC
//   type: 'Journey', // article
//   categories: '[1, 2, 3]', // [], '',
//   sortField: createdAtSortFieldEnum.createdAt,
//   ids: '[1, 2, 3, 4]',
// };

class API {
  public async getDiscovery(
    discoverySearchParams: IDiscoverySearchParams,
  ): Promise<AuthUserLoginByTokenResponseDTO | string> {
    const url = new URL(Config.MAIN_SERVICE_ENDPOINT + "discovery/list");

    // if(Array.isArray(getEnterpriseData[TaxonomyTypeSlug.enterpriseType])){
    //   getEnterpriseData[TaxonomyTypeSlug.enterpriseType]?.forEach((item) => {
    //     url.searchParams.append(`${TaxonomyTypeSlug.enterpriseType}[]`, String(item));
    //   })
    // }

    // if(Array.isArray(getEnterpriseData[TaxonomyTypeSlug.involvementType])){
    //   getEnterpriseData[TaxonomyTypeSlug.involvementType]?.forEach((item) => {
    //     url.searchParams.append(`${TaxonomyTypeSlug.involvementType}[]`, String(item));
    //   })
    // }

    // if(Array.isArray(getEnterpriseData.parents)){
    //   getEnterpriseData.parents?.forEach((item) => {
    //     url.searchParams.append(`parents[]`, String(item));
    //   })
    // }

    // if(Array.isArray(getEnterpriseData.persons)){
    //   getEnterpriseData.persons?.forEach((item) => {
    //     url.searchParams.append(`persons[]`, String(item));
    //   })
    // }

    // if(getEnterpriseData.hasOwnProperty('owner')) url.searchParams.append('owner', String(getEnterpriseData.owner))
    // if(getEnterpriseData.hasOwnProperty('requireChildren')) url.searchParams.append('requireChildren', String(getEnterpriseData.requireChildren))
    // if(getEnterpriseData.hasOwnProperty('decisionMaker')) url.searchParams.append('decisionMaker', String(getEnterpriseData.decisionMaker))

    return handleErrors(
      fetch(url.toString(), {
        method: 'GET',
        headers: {
          // ...authHeader(accessToken),
        },
      }),
    );
  }
}
export const AuthAPI = new API();
