import { createAction, getType } from 'typesafe-actions';
import {
  Action,
  ActionCreatorBuilder,
  PayloadAction,
} from 'typesafe-actions/dist/type-helpers';

import { IChangeStateAction, IError, ILoader } from '../model';
import { IState } from './model';

// type GetAction<TAction extends Action, TType extends TAction['type']> = TAction extends Action<TType> ? TAction : never;

type InitialHandler<
  TState extends { state: IState },
  TRootAction extends PayloadAction<string, any>
> = {
  [P in string]?: (state: TState, action: TRootAction) => TState;
};

export type defaultActions =
  | 'addLoader'
  | 'addError'
  | 'removeLoader'
  | 'removeError';

export interface defaultState {
  state: IState;
  isAll?: boolean;
  count?: number;
}

export const generateLoaderActions = <
  TState extends { state: IState },
  TAction extends PayloadAction<string, any>
>(
  widgetName: string,
): {
  handlers: InitialHandler<TState, TAction>;
  actions: { [key in defaultActions]: ActionCreatorBuilder<any, any, any> };
} => {
  const addLoader = createAction(`${widgetName}/ADD_LOADER`)<ILoader>();

  const addError = createAction(`${widgetName}/ADD_ERROR`)<
    IError & { id: string }
  >();

  const removeLoader = createAction(`${widgetName}/REMOVE_LOADER`)<{
    id: string;
  }>();

  const removeError = createAction(`${widgetName}/REMOVE_ERROR`)<{
    type: string;
  }>();

  const actions = { addLoader, addError, removeLoader, removeError };

  return {
    handlers: {
      [getType(addLoader)]: (
        state: TState,
        action: PayloadAction<string, IChangeStateAction>,
      ): TState => ({
        ...state,
        state: {
          ...state.state,
          loaders: [...state.state.loaders, action.payload],
          errors: state.state.errors.filter(
            (error: IError) => error.type !== action.payload.type,
          ),
        },
      }),
      [getType(addError)]: (
        state: TState,
        action: PayloadAction<string, IChangeStateAction>,
      ): TState => ({
        ...state,
        state: {
          ...state.state,
          loaders: state.state.loaders.filter(
            (loader: ILoader) => loader.id !== action.payload.id,
          ),
          errors: [...state.state.errors, action.payload],
        },
      }),
      [getType(removeLoader)]: (
        state: TState,
        action: PayloadAction<string, IChangeStateAction>,
      ): TState => ({
        ...state,
        state: {
          ...state.state,
          loaders: state.state.loaders.filter(
            (loader: ILoader) => loader.id !== action.payload.id,
          ),
        },
      }),
      [getType(removeError)]: (
        state: any,
        action: PayloadAction<string, IChangeStateAction>,
      ): TState => ({
        ...state,
        state: {
          ...state.state,
          errors: state.state.errors.filter(
            (error: IError) => error.type !== action.payload.type,
          ),
        },
      }),
    },
    actions,
  };
};
