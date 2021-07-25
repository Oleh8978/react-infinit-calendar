import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

// interfaces 
import { IRoutObserverState } from './models';


const widgetName  = 'ROUT_TRACKER';

// ** Action
export const setAuthenticatedStatus = createAction(
    `${appName}/${widgetName}/SET_ROUT_STATE_STATUS`,
  )<IRoutObserverState>();