export enum UserAction {
  LOGIN = 'Login',
  CREATE = 'Create user',
  UPDATE = 'Update user',
  DELETE = 'Delete user',
  PROMOTE = 'Promote user',
}

export enum ItemAction {
  GET_ALL = 'Get all items',
  GET = 'Get single item',
  CREATE = 'Create an item',
  GET_TAGGED = 'Get all items with a tag',
  UPDATE = 'Update item',
  DELETE = 'Delete item',
}

export enum OrderAction {
  PLACE = 'Place order',
  GET_ALL = 'Get all orders',
  GET = 'Get single order',
  CANCEL = 'Cancel order',
}
