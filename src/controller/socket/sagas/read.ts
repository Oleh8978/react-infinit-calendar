import { take, call, put } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';
import { subscribe } from '../suscribe';
import { ISocketEvent } from '../models';

export function* read(socket: Socket, events: ISocketEvent[]) {
  const channel = yield call(subscribe, socket, events);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
