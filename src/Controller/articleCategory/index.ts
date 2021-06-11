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
import { concatWithUnique } from '../../utils/concatWithUnique';

export type AericleActionType = ActionType<typeof actions>;

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
  isLoading: false,
  anyErrors: false,
  error: undefined,
};

export const ArticleReducer = createReducer<
  IAcrticleCategoryState,
  AericleActionType
>(initialState).handleAction(
  [actions.getArticlesCategoriesAction.success],
  (state: IAcrticleCategoryState, { payload }): IAcrticleCategoryState => {
    const storedSearchParams = state.storedSearchParams;
    const { searchParams }: any = payload.searchParams;

    const articleCategoriesObjectList = {
      ...state.articleCategoriesObject,
    };

    payload.response.items.forEach((elem) => {
      if (
        articleCategoriesObjectList.items.find((item) => item.id !== elem.id)
      ) {
        articleCategoriesObjectList.items.push(elem);
      } else {
        return articleCategoriesObjectList.items;
      }

    });

    let articleCategoryList;
    if (
      JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
      JSON.stringify(omit(searchParams, ['limit', 'offset']))
    ) {
        articleCategoryList = concatWithUnique<ArticleDTO>(
        state.articleCategoriesObject.items || [],
        payload.response.items.map((item) => item),
      );
    } else {
        articleCategoryList = concatWithUnique<ArticleDTO>(
        [],
        payload.response.items.map((item) => item),
      );
    }

    return {
      ...state,
      storedSearchParams: searchParams,
      articleCategoriesObject: {
        counts: payload.response.counts,
        items: articleCategoryList,
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
