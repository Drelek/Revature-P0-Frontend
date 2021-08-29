import Item from '../../models/Item';
import { Action } from './RootAction';

export enum ItemActionTypes {
  GET_ALL = 'Get all items',
  GET = 'Get single item',
  CREATE = 'Create an item',
  GET_TAGGED = 'Get all items with a tag',
  UPDATE = 'Update item',
  DELETE = 'Delete item',
  UPDATE_STORE = 'Update stored items',
}

export interface IItemAction {
  type: ItemActionTypes;
  payload?: any;
}

export class GetAllItemsAction extends Action implements IItemAction {
  public type = ItemActionTypes.GET_ALL;
}

export class CreateItemAction extends Action implements IItemAction {
  public type = ItemActionTypes.CREATE;
  public payload: { item: Item; apiKey: string };

  constructor(item: Item, apiKey: string) {
    super();
    this.payload = { item, apiKey };
  }
}

export class GetTaggedItemsAction extends Action implements IItemAction {
  public type = ItemActionTypes.GET_TAGGED;
  public payload: string;

  constructor(tag: string) {
    super();
    this.payload = tag;
  }
}

export class UpdateItemAction extends Action implements IItemAction {
  public type = ItemActionTypes.UPDATE;
  public payload: { item: Item; apiKey: string };

  constructor(item: Item, apiKey: string) {
    super();
    this.payload = { item, apiKey };
  }
}

export class DeleteItemAction extends Action implements IItemAction {
  public type = ItemActionTypes.DELETE;
  public payload: { id: number; apiKey: string };

  constructor(id: number, apiKey: string) {
    super();
    this.payload = { id, apiKey };
  }
}

export class UpdateStoredItemsAction extends Action implements IItemAction {
  public type = ItemActionTypes.UPDATE_STORE;
  public payload: Item[];

  constructor(items: Item[]) {
    super();
    this.payload = items;
  }
}
