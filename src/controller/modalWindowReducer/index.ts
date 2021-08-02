import { ActionType, createReducer } from 'typesafe-actions';

// interfaces
import { IModalWindowState } from './models';

//action
import * as actions from './actions';

const initialState: IModalWindowState = {
  status: false,
};

export type ModalWindowAction = ActionType<typeof actions>;

export const ModalWindowReducer = createReducer<
  IModalWindowState,
  ModalWindowAction
>(initialState).handleAction(
  actions.setModalWindowOpened,
  (state: IModalWindowState, { payload }): IModalWindowState => ({
    status: payload.status,
  }),
);
