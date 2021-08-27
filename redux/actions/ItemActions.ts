import Item from '../../models/Item';

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
  payload?: Item | Item[] | number | string;
}

export class GetAllItemsAction implements IItemAction {
  public type = ItemActionTypes.GET_ALL;
}

export class CreateItemAction implements IItemAction {
  public type = ItemActionTypes.CREATE;
  public payload: Item;

  constructor(item: Item) {
    this.payload = item;
  }
}

export class GetTaggedItemsAction implements IItemAction {
  public type = ItemActionTypes.GET_TAGGED;
  public payload: string;

  constructor(tag: string) {
    this.payload = tag;
  }
}

export class UpdateItemAction implements IItemAction {
  public type = ItemActionTypes.UPDATE;
  public payload: Item;

  constructor(item: Item) {
    this.payload = item;
  }
}

export class DeleteItemAction implements IItemAction {
  public type = ItemActionTypes.DELETE;
  public payload: number;

  constructor(itemId: number) {
    this.payload = itemId;
  }
}

export class UpdateStoredItemsAction implements IItemAction {
  public type = ItemActionTypes.UPDATE_STORE;
  public payload: Item[];

  constructor(items: Item[]) {
    this.payload = items;
  }
}
