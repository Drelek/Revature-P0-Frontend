import Item from '../../models/Item';
import { IItemAction, ItemActionTypes } from '../actions/ItemActions';

const initialState: Item[] = [];

export default function itemReducer(
  state: Item[] = initialState,
  action: IItemAction
) {
  switch (action.type) {
    case ItemActionTypes.UPDATE_STORE:
      return action.payload;
    default:
      return state;
  }
}
