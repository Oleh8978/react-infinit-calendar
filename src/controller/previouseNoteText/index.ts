import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';

// interfaces
import { INotePrevState } from './model';

export type noteSendActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: INotePrevState = {
  state: undefined,
};

export const notePrevStateReducer = createReducer<
  INotePrevState,
  noteSendActionType
>(initialState).handleAction(
  actions.setLocalDataForNotePrevState,
  (state, { payload }) => {
    return {
      ...state,
      state: { ...payload },
    };
  },
);
