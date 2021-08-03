import { createReducer, ActionType } from 'typesafe-actions';

import { pushHistoryState, popHistoryState, setHistoryState } from './actions';

import { IHistoryState, IHistoryStep } from './models';

import * as actions from './actions';

export type DataActionType = ActionType<typeof actions>;

/* Reducer */
const initialState: IHistoryState = [];

export const historyReducer = createReducer<IHistoryState, DataActionType>(
  initialState,
)
  .handleAction(
    [pushHistoryState],
    (state: IHistoryState, { payload }): IHistoryState => [...state, payload],
  )
  .handleAction(
    [setHistoryState],
    (
      state: IHistoryState,
      { payload }: { payload: IHistoryStep },
    ): IHistoryState => [payload],
  )
  .handleAction(
    [popHistoryState],
    (state: IHistoryState): IHistoryState => state.slice(0, state.length - 1),
  );
