import { all } from 'redux-saga/effects';
import { createReducer, ActionType, getType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
import { IArticleListState } from './models';
import { ArticleDTO } from '@ternala/frasier-types';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

export type ArticleActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: IArticleListState = {
  state: {
    items: [],
    counts: undefined,
  },
  storedSearchParams: null,
  loader: {
    status: false,
  },
};

export const ArticleListReducer = createReducer<
  IArticleListState,
  ArticleActionType
>(initialState)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    loader: { ...payload },
  }))
  .handleAction(
    [actions.getArticleListByModuleCqategory.success],
    (state: IArticleListState, { payload }): IArticleListState => {
      const storedSearchParams = state.storedSearchParams;
      const { searchParams }: any = payload.searchParams;

      const articleItemsList = [];

      payload.response.items.map((ele) => {
        if (
          state.state.items.find((item) => item.id === ele.id) === undefined
        ) {
          return articleItemsList.push(ele);
        }
      });

      let articleCategoryList;
      if (
        JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
        JSON.stringify(omit(searchParams, ['limit', 'offset']))
      ) {
        articleCategoryList = concatWithUnique<ArticleDTO>(
          state.state.items || [],
          articleItemsList,
        );
      } else {
        articleCategoryList = concatWithUnique<ArticleDTO>(
          [],
          articleItemsList,
        );
      }

      return {
        ...state,
        storedSearchParams: searchParams,
        state: {
          counts: payload.response.counts,
          items: articleCategoryList,
        },
        loader: {
          status: false,
        },
      };
    },
  );
