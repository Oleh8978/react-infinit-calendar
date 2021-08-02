import { ActionType, createReducer } from 'typesafe-actions';

// interfaces
import { ISaveBTNState } from './models';

//action
import * as actions from './actions';

const initialState: ISaveBTNState = {
  isActive: false,
};

export type SaveBTnActions = ActionType<typeof actions>;

export const SaveBTNReducer = createReducer<ISaveBTNState, SaveBTnActions>(
  initialState,
).handleAction(
  actions.setSaveBTNStatus,
  (state: ISaveBTNState, { payload }): ISaveBTNState => ({
    isActive: payload.isActive,
  }),
);
