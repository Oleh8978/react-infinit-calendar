import { IDayWithTimeSlots, ModuleGetResponse } from '@ternala/frasier-types';

export const model = '';

import { defaultState } from '../based';

export interface ModuleExpandDTO extends ModuleGetResponse {
  timeSlotData?: IDayWithTimeSlots;
  uncompletedTimeSlotData?: IDayWithTimeSlots;
}

export interface IModuleState extends defaultState {
  moduleData: { [id: string]: ModuleExpandDTO };
}
