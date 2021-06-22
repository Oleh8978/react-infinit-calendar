import { all } from 'redux-saga/effects';
import { createReducer, ActionType, getType } from 'typesafe-actions';
import { omit } from 'lodash';

// Actions
import * as actions from './actions';

// Interfaces
import { IAcrticleCategoryState } from './models';
import { ArticleDTO } from '@ternala/frasier-types';

//Sagas
import { ArticleCategoriesSaga } from './sagas/articleCategorySagas';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

export type ArticleActionType = ActionType<typeof actions>;

export const ArticleSaga = function* () {
  yield all([ArticleCategoriesSaga()]);
};

/* Reducer */
const initialState: IAcrticleCategoryState = {
  articleCategoriesObject: {
    counts: 0,
    items: [],
  },
  storedSearchParams: null,
  isLoading: {
    status: false,
    anyErrors: false,
    error: undefined,
  },
};

export const ArticleReducer = createReducer<
  IAcrticleCategoryState,
  ArticleActionType
>(initialState)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    isLoading: { ...payload },
  }))
  .handleAction(
    [actions.getArticlesCategoriesAction.success],
    (state: IAcrticleCategoryState, { payload }): IAcrticleCategoryState => {
      const storedSearchParams = state.storedSearchParams;
      const { searchParams }: any = payload.searchParams;

      const articleItemsList = [];

      payload.response.items.map((ele) => {
        if (
          state.articleCategoriesObject.items.find(
            (item) => item.id === ele.id,
          ) === undefined
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
          state.articleCategoriesObject.items || [],
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
        articleCategoriesObject: {
          counts: payload.response.counts,
          items: articleCategoryList,
        },
        isLoading: {
          status: false,
          anyErrors: false,
          error: undefined,
        },
      };
    },
  );
