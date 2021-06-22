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
import { concatWithUnique } from '../../utils/concatWithUnique';

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

        const journeyState = state.discoveryList.items.filter(
          (item) =>
            Object.keys(item).filter((key) => key === 'journey').length !== 0,
        );
        console.log('journeyState', journeyState);
        const journeyPayloadState = payload.response.items.filter(
          (item) =>
            Object.keys(item).filter((key) => key === 'journey').length !== 0,
        );

        const articleState = state.discoveryList.items.filter(
          (articleObject) =>
            Object.keys(articleObject).filter((key) => key === 'article')
              .length !== 0,
        );

        const articlePayload = payload.response.items.filter(
          (articlepayloadObject) =>
            Object.keys(articlepayloadObject).filter((key) => key === 'article')
              .length !== 0,
        );

        journeyPayloadState.map((item) => {
          if (
            journeyState.find(
              (element) => element.journey.id === item.journey.id,
            ) === undefined
          ) {
            payloadResponseArray.push(item);
          }
        });

        articlePayload.map((item) => {
          if (
            articleState.find(
              (element) => element.article.id === item.article.id,
            ) === undefined
          ) {
            payloadResponseArray.push(item);
          }
        });

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
