import { ILoadingAction, LoadingActionTypes } from '../actions/LoadingActions';

export default function loadingReducer(
  state: boolean = false,
  action: ILoadingAction
) {
  switch (action.type) {
    case LoadingActionTypes.LOADING:
      return true;
    case LoadingActionTypes.LOADED:
      return false;
    default:
      return state;
  }
}
