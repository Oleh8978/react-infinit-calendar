import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';
// interfaces
import { IAccountState } from './models';

//Sagas
import { accountSaga } from './sagas/accountSagas';

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
  // .handleAction(
  //   [actions.getUserAction.request],
  //   (state: IAccountState): IAccountState => ({
  //     ...state,
  //     isLoading: {
  //       status: true,
  //     },
  //     exceptions: {
  //       code: '',
  //       message: '',
  //       name: '',
  //     },
  //   }),
  // )
  .handleAction(
    [actions.getUserAction.success],
    (state: IAccountState, { payload }): IAccountState => ({
      ...state,
      user: { ...payload },
      isLoading: {
        status: false,
      },
      exceptions: {
        code: '',
        message: '',
        name: '',
      },
    }),
  )
  .handleAction(
    [actions.getUserAction.failure],
    (state: IAccountState, { payload }): IAccountState => ({
      ...state,
      user: { ...state.user },
      isLoading: {
        status: false,
      },
      exceptions: {
        code: payload.code,
        message: payload.message,
        name: payload.name,
      },
    }),
  );
