import { ActionType, createReducer } from 'typesafe-actions';

// interfaces
import { ISelectedExpert } from './models';

//action
import * as actions from './actions';

const initialState: ISelectedExpert = {
  expert: undefined,
};

export type ExpertAction = ActionType<typeof actions>;

export const ExpertSelectedStateReducer = createReducer<
  ISelectedExpert,
  ExpertAction
>(initialState).handleAction(
  actions.setSelectedExpert,
  (state: ISelectedExpert, { payload }): ISelectedExpert => ({
    expert: payload.expert,
  }),
);
