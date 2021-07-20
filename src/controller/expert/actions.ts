import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config/index';

//Interfaces
import { ISetLoadingAction, IExpertStateRequsted } from './models';
import { ExpertCreateRequest } from '@ternala/frasier-types';

// const for ath actions
export const widgetName = 'EXPERT';

// loading action
export const setLoadingAction = createAction(
  `${appName}/${widgetName}/SET_ISLOADING_STATUS`,
)<ISetLoadingAction>();

// ** Action
export const getExpertById = createAsyncAction(
  `${appName}/${widgetName}/GET_EXPERT_REQUEST`,
  `${appName}/${widgetName}/GET_EXPERT_SUCCESS`,
  `${appName}/${widgetName}/GET_EXPERT_FAILED`,
)<number, IExpertStateRequsted, ISetLoadingAction>();
