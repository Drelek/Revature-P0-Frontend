import { IToastOptions } from '../../models/Toast';
import { Action } from './RootAction';

export enum ToastActionTypes {
  DISPLAY = 'Display toast',
}

export interface IToastAction {
  type: ToastActionTypes;
  payload: IToastOptions;
}

export class ToastAction extends Action implements IToastAction {
  public type = ToastActionTypes.DISPLAY;

  constructor(public payload: IToastOptions) {
    super();
  }
}
