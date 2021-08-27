import Order from '../../models/Order';

export enum OrderActionTypes {
  PLACE = 'Place order',
  GET_ALL = 'Get all orders',
  GET = 'Get single order',
  CANCEL = 'Cancel order',
  UPDATE_STORE = 'Updated stored orders',
}

export interface IOrderAction {
  type: OrderActionTypes;
  payload?: Order | Order[] | number;
}

export class PlaceOrderAction implements IOrderAction {
  public type = OrderActionTypes.PLACE;
  public payload: Order;

  constructor(order: Order) {
    this.payload = order;
  }
}

export class GetAllOrdersAction implements IOrderAction {
  public type = OrderActionTypes.GET_ALL;
}

export class CancelOrderAction implements IOrderAction {
  public type = OrderActionTypes.CANCEL;
  public payload: number;

  constructor(receipt: number) {
    this.payload = receipt;
  }
}

export class UpdateStoredOrdersAction implements IOrderAction {
  public type = OrderActionTypes.UPDATE_STORE;
  public payload: Order[];

  constructor(orders: Order[]) {
    this.payload = orders;
  }
}
