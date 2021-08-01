import { eventChannel } from 'redux-saga';
import { ISocketEvent } from './models';
import { Socket } from 'socket.io-client';

export function subscribe(socket: Socket, events: ISocketEvent[]) {
  return eventChannel((emit) => {
    events.forEach((event) => {
      socket.on(event.eventName, (data: any) => {
        emit(event.action(data));
      });
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {
    };
  });
}
