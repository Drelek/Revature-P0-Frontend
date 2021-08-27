import User from '../models/User';
import Item from '../models/Item';
import Order from '../models/Order';

export interface IAppState {
  user?: User;
  items?: Item[];
  orders?: Order[];
  loading: boolean;
}

export const initialState: IAppState = {
  user: undefined,
  items: undefined,
  orders: undefined,
  loading: false,
};
