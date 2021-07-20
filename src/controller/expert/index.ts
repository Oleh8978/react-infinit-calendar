import { ActionType, createReducer } from 'typesafe-actions';

// interfaces
import { IExpertState } from './models';

//action
import * as actions from './actions';

const initialState: IExpertState = {
  state: {
    id: undefined,
    name: null,
    image: null,
    specialization: null,
    createdAt: null,
    moduleCategories: [],
    actions: [],
    phones: [],
    emails: [],
    links: [],
  },
  loaderState: {
    status: false,
    isAnyError: false,
    error: '',
  },
};

export type NotesActionType = ActionType<typeof actions>;

export const GetNotesListReducer = createReducer<IExpertState, NotesActionType>(
  initialState,
)
  .handleAction(
    actions.setLoadingAction,
    (state: IExpertState, { payload }): IExpertState => ({
      ...state,
      loaderState: {
        ...payload,
      },
    }),
  )
  .handleAction(
    [actions.getExpertById.success],
    (state: IExpertState, { payload }): IExpertState => ({
      ...state,
      state: { ...payload },
    }),
  );
