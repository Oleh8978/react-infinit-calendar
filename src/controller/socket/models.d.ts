// Interfaces
import { PayloadActionCreator } from 'typesafe-actions';

export interface ISocketState {
  channelStatus?: string;
  serverStatus?: string;
  loading: boolean;
}

export interface ISocketEvent {
  eventName: string;
  action: PayloadActionCreator<string, any>;
}

export interface INamespaceInterface {
  title: string;
  events: ISocketEvent[];
}
