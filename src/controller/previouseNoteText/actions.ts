import { createAction, createAsyncAction } from 'typesafe-actions';

import { appName } from '@app/config';

// interfaces
import { INotePrepareForSending } from './model';

// widjet name
export const widgetName = 'NOTE_DATA_COLLECTOR_PREV_STATE';

// loading action
export const setLocalDataForNotePrevState = createAction(
  `${appName}/${widgetName}/MANAGE_DATA_PREV_STATE`,
)<INotePrepareForSending>();
