import { IToastOptions } from '../../models/Toast';

export enum ToastActionTypes {
  DISPLAY = 'Display toast',
}

export interface IToastAction {
  type: ToastActionTypes;
  payload: IToastOptions;
}

export class ToastAction implements IToastAction {
  public type = ToastActionTypes.DISPLAY;

  constructor(public payload: IToastOptions) {}
}
