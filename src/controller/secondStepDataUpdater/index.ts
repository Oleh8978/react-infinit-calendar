import { ActionType, createReducer } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
// actions
import * as actions from './actions';
// interfaces
import { IUpdateState } from './models';

//Sagas
import { updateUserDataSaga } from './sagas/secondStepSaga';

export type UpdateUserActionType = ActionType<typeof actions>;

export const authSaga = function* () {
  yield all([updateUserDataSaga()]);
};

const initialState: IUpdateState = {
  userData: {
    user: 0,
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  },
  loaderState: {
    status: false,
    code: '',
    message: '',
  },
  isSecondStepPassed: false,
};

export const UpdateAfterSignInRequestReducer = createReducer<
  IUpdateState,
  UpdateUserActionType
>(initialState)
  .handleAction(
    actions.LoaderAction,
    (state: IUpdateState, { payload }): IUpdateState => ({
      userData: state.userData,
      loaderState: payload,
      isSecondStepPassed: state.isSecondStepPassed,
    }),
  )
  .handleAction(
    actions.setIsSecondStepPassed,
    (state: IUpdateState, { payload }): IUpdateState => ({
      ...state,
      isSecondStepPassed: payload.isSecondStepPassed,
    }),
  )
  .handleAction(
    [actions.updateUserDataAction.success],
    (state: IUpdateState, { payload }): IUpdateState => ({
      ...state,
      userData: {
        ...payload
      },
      isSecondStepPassed: true,
    }),
  );
