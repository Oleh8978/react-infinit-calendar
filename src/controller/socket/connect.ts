import io from 'socket.io-client';
import { Config } from '@app/config/API';
import { enableSocketLog } from '@app/config';
import { UserTypeEnum } from '@ternala/frasier-types';
import { authTypeEnum } from '@ternala/frasier-types/lib/constants/main';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connect = (token: string, namespace: string) => {
  console.log(
    'Config.WS_ENDPOINT + namespace: ',
    Config.WS_ENDPOINT + namespace,
  );
  const socket = io(Config.WS_ENDPOINT + namespace, {
    transports: ['websocket'],
    query: {
      [authTypeEnum.access]: token,
    },
    forceNew: true,
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      enableSocketLog && console.log('socket connected ' + namespace);
      resolve(socket);
    });

    if (enableSocketLog) {
      (function () {
        const emit = socket.emit;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        socket.emit = function (event: string, ...args: any[]) {
          process.env.REACT_APP_SHOW_LOGS === 'true' &&
            console.log(
              `socket namespace ${namespace}: `,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line prefer-rest-params
              Array.prototype.slice.call(arguments),
            );
          emit.apply(socket, [event, ...args]);
        };
      })();
    }
  });
};
