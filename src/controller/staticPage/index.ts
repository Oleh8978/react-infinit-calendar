import { ActionType, createReducer } from 'typesafe-actions';

// actions
import * as actions from './actions';

// interfaces
import { IPagesSate } from './models';

const initialState: IPagesSate = {
  state: undefined,
  loaderState: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export type PagesActionType = ActionType<typeof actions>;

export const StaticPageReducer = createReducer<IPagesSate, PagesActionType>(
  initialState,
)
  .handleAction(
    actions.setLoadingAction,
    (state: IPagesSate, { payload }): IPagesSate => ({
      ...state,
      loaderState: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.getPageBySlug.success],
    (state: IPagesSate, { payload }): IPagesSate => ({
      ...state,
      state: { ...payload },
    }),
  );
