import { ActionType, createReducer } from 'typesafe-actions';

// interfaces
import { IStaticPageState } from '../staticPage/models';

//Sagas
import * as actions from '../staticPage/actions';

const initialState: IStaticPageState = {
  state: {
    items: undefined,
    counts: undefined,
  },

  loaderState: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export type staticPagesListActionType = ActionType<typeof actions>;

export const GetStaticPagesListReducer = createReducer<
  IStaticPageState,
  staticPagesListActionType
>(initialState)
  .handleAction(
    actions.setLoadingAction,
    (state: IStaticPageState, { payload }): IStaticPageState => ({
      ...state,
      loaderState: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.staticPagesList.success],
    (state: IStaticPageState, { payload }): IStaticPageState => ({
      ...state,
      state: { ...payload },
    }),
  );
