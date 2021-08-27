import Order from '../../models/Order';
import { IOrderAction, OrderActionTypes } from '../actions/OrderActions';

const initialState: Order[] = [];

export default function orderReducer(
  state: Order[] = initialState,
  action: IOrderAction
) {
  switch (action.type) {
    case OrderActionTypes.UPDATE_STORE:
      return action.payload;
    default:
      return state;
  }
}
