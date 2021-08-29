import Toast from 'react-native-toast-message';
import { IToastOptions } from '../../models/Toast';
import { IToastAction, ToastActionTypes } from '../actions/ToastActions';

export default function toastReducer(
  state: IToastOptions = { type: null },
  action: IToastAction
) {
  switch (action.type) {
    case ToastActionTypes.DISPLAY:
      if (action.payload.type !== null) Toast.show(action.payload as any);
      return action.payload;
    default:
      return state;
  }
}
