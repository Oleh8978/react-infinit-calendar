import { all } from 'redux-saga/effects';
import { createReducer, ActionType, getType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
import { IStore } from '../model';
import { IDiscoveryState } from './model';
import { DiscoveryDTO } from '@ternala/frasier-types';

//Sagas
import { DiscoveryListSaga } from './sagas/discovery';

// utils
import { concatWithUnique } from '../../Utils/concatWithUnique';

export type DiscoveryListTypeAction = ActionType<typeof actions>;

export const DiscoverySaga = function* () {
  yield all([DiscoveryListSaga()]);
};

/* Reducer */
const initialState: IDiscoveryState = {
  discoveryList: {
    counts: 0,
    items: [],
  },
  storedSearchParams: null,
  isLoading: false,
  anyErrors: false,
  error: undefined,
};

export const discoveryListReducer = createReducer<
  IDiscoveryState,
  DiscoveryListTypeAction
>(initialState).handleAction(
  [actions.getDiscoveryList.success],
  (state: IDiscoveryState, { payload }): IDiscoveryState => {
    const storedSearchParams = state.storedSearchParams;
    const { searchParams }: any = payload.searchParams;

    const discoveryList = {
      ...state.discoveryList,
    };

    payload.response.items.forEach((elem) => {
      if (
        discoveryList.items.find(
          (item) =>
            item.article.id !== elem.article.id &&
            item.journey.id !== elem.article.id,
        )
      ) {
        discoveryList.items.push(elem);
      } else {
        return discoveryList.items;
      }

      // discoveryList.items[elem.] = {
      //   ...discoveryList.items[elem.type],
      //   ...elem,
      // };
    });

    let newDiscoveryList;
    if (
      JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
      newDiscoveryList = concatWithUnique<DiscoveryDTO>(
        state.discoveryList.items || [],
        payload.response.items.map((item) => item),
      );
    } else {
      newDiscoveryList = concatWithUnique<DiscoveryDTO>(
        [],
        payload.response.items.map((item) => item),
      );
    }

    return {
      ...state,
      storedSearchParams: searchParams,
      discoveryList: {
        counts: payload.response.counts,
        items: newDiscoveryList,
      },
      isLoading: false,
      anyErrors: false,
      error: undefined,
    };
  },
);

/* Selectors */
// export const getDiscoveries = (state: IStore) => state.;
// export const getPropertiesCount = (state: IStore) =>
//   state.property.properties?.length || 0;
