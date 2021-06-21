import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';
// interfaces
import { IStore } from '../model';
import { IAccountState } from './models';

//Sagas
import { accountSaga } from './sagas/accountSagas';

// functionality
import { getSavedAccess } from '@app/utils/manageAccess';
import { getCredentials } from '@app/utils/deviceCredentials';

export type AccountActionType = ActionType<typeof actions>;

export const accountUserSaga = function* () {
  yield all([accountSaga()]);
};

const initialState: IAccountState = {
  user: {
    id: 0,
    isCanSendEmail: false,
    isCanSendPush: false,
    isNeedSecondStep: false,
    journeyConnections: [],
    userData: {
      firstName: '',
      image: '',
      lastName: '',
      email: '',
      phone: '',
    },
  },
  isLoading: {
    status: false,
  },
  exceptions: {
    code: '',
    message: '',
    name: '',
  },
};

export const userReducer = createReducer<IAccountState, AccountActionType>(
  initialState,
)
  .handleAction(actions.setLoadingAction, (store, { payload }) => ({
    ...store,
    isLoading: payload,
  }))
  .handleAction(
    [actions.getUserAction.request],
    (state: IAccountState, { payload }): IAccountState => ({
      ...state,
    }),
  )
  .handleAction(
    [actions.getUserAction.success],
    (state: IAccountState, { payload }): IAccountState => ({
      ...state,
    }),
  )
  .handleAction(
    [actions.getUserAction.failure],
    (state: IAccountState, { payload }): IAccountState => ({
      ...state,
    }),
  );
