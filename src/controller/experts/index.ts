import { ActionType, createReducer } from 'typesafe-actions';
import { omit } from 'lodash';

// utils
import { concatWithUnique } from '@app/utils/concatWithUnique';

// interfaces
import { IExpertsState } from './models';
import { ExpertDTO } from '@ternala/frasier-types';

//action
import * as actions from './actions';

const initialState: IExpertsState = {
  state: {
    items: [],
    counts: undefined,
  },
  storedSearchParams: {
    limit: null,
    offset: null,
    query: '',
    sortType: '',
    ids: [],
    moduleCategories: [],
    sortField: [],
  },
  loaderState: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export type ExpertsListState = ActionType<typeof actions>;

export const GetNotesListReducer = createReducer<IExpertsState, ExpertsListState>(
  initialState,
)
  .handleAction(
    actions.setLoadingAction,
    (state: IExpertsState, { payload }): IExpertsState => ({
      ...state,
      loaderState: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.getExpersList.success],
    (state: IExpertsState, { payload }): IExpertsState => {
      const storedSearchParams = { ...state.storedSearchParams };
      const { searchParams }: any = payload;

      let newExpertsList;
      if (
        JSON.stringify(omit(storedSearchParams, ['limit', 'offset'])) ===
        JSON.stringify(omit(searchParams, ['limit', 'offset']))
      ) {
        const updateArray = [];
        payload.response.items.map((item) => {
          if (
            state.state.items.filter((elem) => elem.id === item.id).length === 0
          ) {
            updateArray.push(item);
          }
        });
        newExpertsList = concatWithUnique<ExpertDTO>(
          state.state.items || [],
          payload.response.items.map((item) => item),
        );
      } else {
        newExpertsList = concatWithUnique<ExpertDTO>(
          [],
          payload.response.items.map((item) => item),
        );
      }

      return {
        ...state,
        state: {
          counts: payload.response.counts,
          items: newExpertsList,
        },
        storedSearchParams: searchParams,
      };
    },
  );
