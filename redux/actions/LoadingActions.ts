import { Action } from './RootAction';

export enum LoadingActionTypes {
  LOADING = 'Loading...',
  LOADED = 'Completed',
}

export interface ILoadingAction {
  type: LoadingActionTypes;
}

export class BeginLoadingAction extends Action implements ILoadingAction {
  public type = LoadingActionTypes.LOADING;
}

export class FinishLoadingAction extends Action implements ILoadingAction {
  public type = LoadingActionTypes.LOADED;
}
