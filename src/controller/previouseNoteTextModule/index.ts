import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';

// interfaces
import { INotePrevStateModule } from './model';

export type noteSendActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: INotePrevStateModule = {
  state: undefined,
};

export const notePrevStateReducerModule = createReducer<
  INotePrevStateModule,
  noteSendActionType
>(initialState).handleAction(
  actions.setLocalDataForNotePrevStateModule,
  (state, { payload }) => {
    return {
      ...state,
      state: { ...payload },
    };
  },
);
