import { fork } from "redux-saga/effects";
import { Socket } from 'socket.io-client';

import { write } from "./write";
import { read } from "./read";
import {ISocketEvent} from "../models";

export function* handleIO(socket: Socket, events: ISocketEvent[]) {
  yield fork(read, socket, events);
  yield fork(write, socket);
}
