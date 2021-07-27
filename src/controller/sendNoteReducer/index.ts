import { all } from 'redux-saga/effects';
import { createReducer, ActionType } from 'typesafe-actions';

// Actions
import * as actions from './actions';

// interfaces
import { INoteSend } from './models';

export type noteSendActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: INoteSend = {
  state: undefined,
};

export const noteLocalDataCollectorReducer = createReducer<
  INoteSend,
  noteSendActionType
>(initialState)
  .handleAction(actions.setLocalDataForNote, (state, { payload }) => {
    return {
      ...state,
      state: { ...payload },
    };
  })
  .handleAction(actions.sendNoteAction.success, (state, { payload }) => ({
    ...state,
  }));
