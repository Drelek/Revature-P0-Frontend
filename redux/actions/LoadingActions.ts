export enum LoadingActionTypes {
  LOADING = 'Loading...',
  LOADED = 'Completed',
}

export interface ILoadingAction {
  type: LoadingActionTypes;
}

export class BeginLoadingAction implements ILoadingAction {
  public type = LoadingActionTypes.LOADING;
}

export class FinishLoadingAction implements ILoadingAction {
  public type = LoadingActionTypes.LOADED;
}
