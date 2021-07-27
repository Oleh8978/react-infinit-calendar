import { defaultState } from '@app/controller/based';
import { ModuleStatistic } from '@ternala/frasier-types/lib/modules/statistic/response.dto';
import { ProgressStatisticElementDetails } from '@ternala/frasier-types/lib/modules/statistic/statistic.dto';
import { StatisticGetJourneyResponse } from '@ternala/frasier-types';

export interface IJourneyStatistic {
  statistic: ProgressStatisticElementDetails;
  modules: ModuleStatistic[];
}

export interface IStatisticState extends defaultState {
  journeys: { [id: string]: IJourneyStatistic };
}
