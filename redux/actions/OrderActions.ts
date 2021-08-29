import Order from '../../models/Order';
import { Action } from './RootAction';

export enum OrderActionTypes {
  PLACE = 'Place order',
  GET_ALL = 'Get all orders',
  GET = 'Get single order',
  CANCEL = 'Cancel order',
  UPDATE_STORE = 'Updated stored orders',
}

export interface IOrderAction {
  type: OrderActionTypes;
  payload?: any;
}

export class PlaceOrderAction extends Action implements IOrderAction {
  public type = OrderActionTypes.PLACE;
  public payload: { order: Order; apiKey: string };

  constructor(order: Order, apiKey: string) {
    super();
    this.payload = { order, apiKey };
  }
}

export class GetAllOrdersAction extends Action implements IOrderAction {
  public type = OrderActionTypes.GET_ALL;
  public payload: string;

  constructor(apiKey: string) {
    super();
    this.payload = apiKey;
  }
}

export class CancelOrderAction extends Action implements IOrderAction {
  public type = OrderActionTypes.CANCEL;
  public payload: { receipt: number; apiKey: string };

  constructor(receipt: number, apiKey: string) {
    super();
    this.payload = { receipt, apiKey };
  }
}

export class UpdateStoredOrdersAction extends Action implements IOrderAction {
  public type = OrderActionTypes.UPDATE_STORE;
  public payload: Order[];

  constructor(orders: Order[]) {
    super();
    this.payload = orders;
  }
}
