import User, { IUser } from '../../models/User';
import { Action } from './RootAction';

export enum UserActionTypes {
  LOGIN = 'Login',
  CREATE = 'Create user',
  UPDATE = 'Update user',
  DELETE = 'Delete user',
  PROMOTE = 'Promote user',
  UPDATE_STORE = 'Update stored user',
}

export interface IUserAction {
  type: UserActionTypes;
  payload: IUser | string | any;
}

export class LoginAction extends Action implements IUserAction {
  public type: UserActionTypes;
  public payload: string;

  constructor(apiKey: string) {
    super();
    this.type = UserActionTypes.LOGIN;
    this.payload = apiKey;
  }
}

export class CreateUserAction extends Action implements IUserAction {
  public type: UserActionTypes;
  public payload: User;

  constructor(user: User) {
    super();
    this.type = UserActionTypes.CREATE;
    this.payload = user;
  }
}

export class UpdateUserAction extends Action implements IUserAction {
  public type: UserActionTypes;
  public payload: User;

  constructor(newUser: User) {
    super();
    this.type = UserActionTypes.UPDATE;
    this.payload = newUser;
  }
}

export class DeleteUserAction extends Action implements IUserAction {
  public type: UserActionTypes;
  public payload: string;

  constructor(apiKey: string) {
    super();
    this.type = UserActionTypes.DELETE;
    this.payload = apiKey;
  }
}

export class PromoteUserAction extends Action implements IUserAction {
  public type: UserActionTypes;
  public payload: {
    fromKey: string;
    promoteKey: string;
  };

  constructor(apiKey: string, promoteKey: string) {
    super();
    this.type = UserActionTypes.PROMOTE;
    this.payload = {
      fromKey: apiKey,
      promoteKey,
    };
  }
}

export class UpdateStoredUserAction extends Action implements IUserAction {
  public type: UserActionTypes;
  public payload: IUser;

  constructor(user: IUser) {
    super();
    this.type = UserActionTypes.UPDATE_STORE;
    this.payload = user;
  }
}
