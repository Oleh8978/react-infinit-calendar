import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
import { TipFullDTO, TipSendDTO } from '@ternala/frasier-types';
import { ITipsState } from './models';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

export type TipsListActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: ITipsState = {
  tips: {
    itemsCount: undefined,
    items: [],
    newItemsCount: undefined,
  },
  storedSearchParams: {
    limit: '',
    offset: '',
    query: '',
    sortType: '',
    ids: '',
  },
  loaderState: {
    status: false,
    isAnyErrors: false,
    error: '',
  },
};

export const tipsListReducer = createReducer<ITipsState, TipsListActionType>(
  initialState,
)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    status: payload.status,
    isAnyErrors: payload.isAnyErrors,
    error: payload.error,
  }))
  .handleAction(
    [actions.getTipsListRequest.success],
    (state: ITipsState, { payload }): ITipsState => {
      const storedSearchParams = { ...state.storedSearchParams };
      const { searchParams }: any = payload;

      let tipsList;
      if (
        JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
        JSON.stringify(omit(searchParams, ['limit', 'offset']))
      ) {

        const payloadResponseArray = [];

        payload.response.items.map((item) => {
          if (state.tips.items.find((elem) => elem.id !== item.id) === undefined) {
            payloadResponseArray.push(item);
          }
        });
 
        tipsList = concatWithUnique<TipSendDTO>(
          state.tips.items || [],
          payloadResponseArray,
        );
      } else {
        tipsList = concatWithUnique<TipSendDTO>(
          [],
          payload.response.items.map((item) => item),
        );
      }

      return {
        ...state,
        storedSearchParams: searchParams,
        tips: {
          itemsCount: payload.response.counts,
          items: tipsList,
          newItemsCount: payload.response.countNew,
        },
        loaderState: {
          status: false,
          isAnyErrors: false,
          error: '',
        },
      };
    },
  )
  .handleAction(
    [actions.addNewTip],
    (state: ITipsState, { payload }): ITipsState => {
      return {
        ...state,
        tips: {
          itemsCount: undefined,
          items: concatWithUnique<TipSendDTO>(state.tips.items, [payload]),
          newItemsCount: state.tips.newItemsCount
            ? state.tips.newItemsCount + 1
            : 1,
        },
      };
    },
  )
  .handleAction(
    [actions.setReadedItems.success],
    (state: ITipsState, { payload }): ITipsState => ({
      tips: {
        itemsCount: undefined,
        items: [],
        newItemsCount: undefined,
      },
      storedSearchParams: {
        limit: '',
        offset: '',
        query: '',
        sortType: '',
        ids: '',
      },
      loaderState: {
        status: false,
        isAnyErrors: false,
        error: '',
      },
    }),
  );
