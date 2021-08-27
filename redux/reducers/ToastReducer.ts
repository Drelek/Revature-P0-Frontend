import { IToastOptions } from '../../models/Toast';
import { IToastAction, ToastActionTypes } from '../actions/ToastActions';

export default function toastReducer(
  state: IToastOptions = { type: null },
  action: IToastAction
) {
  switch (action.type) {
    case ToastActionTypes.DISPLAY:
      return action.payload;
    default:
      return state;
  }
}
