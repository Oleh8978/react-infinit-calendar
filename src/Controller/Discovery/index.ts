import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
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
  storedSearchParams: {
    limit: '',
    offset: '',
    query: '',
    sortType: '',
    type: '',
    categories: '',
    ids: '',
  },
  isLoading: {
    status: false,
  },
  anyErrors: false,
  error: {
    code: '',
    message: '',
    name: '',
  },
};

export const discoveryListReducer = createReducer<
  IDiscoveryState,
  DiscoveryListTypeAction
>(initialState)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    isLoading: payload,
  }))
  .handleAction(
    [actions.getDiscoveryList.success],
    (state: IDiscoveryState, { payload }): IDiscoveryState => {
      const storedSearchParams = { ...state.storedSearchParams };
      const { searchParams }: any = payload;

      let newDiscoveryList;
      if (
        JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
        JSON.stringify(omit(searchParams, ['limit', 'offset']))
      ) {
        const payloadResponseArray = [];

        const articles = payload.response.items.filter(
          (ele) => ele.article !== undefined,
        );
        if (articles.length !== 0) {
          articles.map((item) => {
            if (
              state.discoveryList.items.find(
                (elem) => elem.article.id !== item.article.id,
              )
            ) {
              if (item !== undefined) {
                return payloadResponseArray.push(item);
              }
            }
          });
        }
        const journeys = payload.response.items.filter(
          (ele) => ele.journey !== undefined,
        );

        if (journeys.length !== 0) {
          journeys.map((item) => {
            if (
              state.discoveryList.items.filter(
                (elem) => elem.journey.id === item.journey.id,
              ).length === 0
            ) {
              if (item !== undefined) {
                return payloadResponseArray.push(item);
              }
            }
          });
        }

        newDiscoveryList = concatWithUnique<DiscoveryDTO>(
          state.discoveryList.items || [],
          payloadResponseArray,
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
        isLoading: {
          status: false,
        },
        anyErrors: false,
        error: {
          code: '',
          message: '',
          name: '',
        },
      };
    },
  );

