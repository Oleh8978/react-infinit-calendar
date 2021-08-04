import { take, call, fork, cancel, all, select } from 'redux-saga/effects';
import { connect } from '../connect';
import { endSocketConnection, startSocketConnection } from '../actions';
import { handleIO } from './handleIO';

import { namespaces } from '../assets';
import { INamespaceInterface } from '../models';
import { getAccessToken } from '@app/controller/auth';

export function* flow() {
  while (true) {
    yield take(startSocketConnection);
    const accessToken: string | undefined = yield yield select(getAccessToken);
    yield all(
      namespaces.map((namespace) =>
        call(addNewNamespace, namespace, accessToken),
      ),
    );
  }
}

export function* addNewNamespace(
  namespace: INamespaceInterface,
  token: string,
) {
  process.env.REACT_APP_SHOW_LOGS === 'true' &&
    console.log('add new namespace');
  const socket = yield call(connect, token, namespace.title);
  const task = yield fork(handleIO, socket, namespace.events);
  yield take(endSocketConnection);

  yield cancel(task);
  socket.emit('logout');
}
