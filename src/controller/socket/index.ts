import { createReducer, ActionType } from 'typesafe-actions';
import { all } from 'redux-saga/effects';

import {
  changeSocketState,
  endSocketConnection,
  startSocketConnection,
} from './actions';

import { ISocketState } from './models';

import * as actions from './actions';
import { flow } from './sagas/flow';

export type SocketActionType = ActionType<typeof actions>;

export const socketSaga = function* () {
  yield all([flow()]);
};

/* Reducer */
const initialState: ISocketState = {
  channelStatus: 'off',
  serverStatus: 'unknown',
  loading: false,
};

export const socketReducer = createReducer<ISocketState, SocketActionType>(
  initialState,
)
  .handleAction(
    [changeSocketState],
    (state: ISocketState, { payload }): ISocketState => ({
      ...state,
      ...payload,
    }),
  )
  .handleAction(
    [endSocketConnection],
    (state: ISocketState): ISocketState => ({
      ...state,
      channelStatus: 'off',
    }),
  )
  .handleAction(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [startSocketConnection],
    (state: ISocketState): ISocketState => ({
      ...state,
      channelStatus: 'on',
    }),
  );
