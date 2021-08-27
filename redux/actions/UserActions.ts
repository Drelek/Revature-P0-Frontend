import User, { IUser } from '../../models/User';

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
  payload: IUser | string;
}

export class LoginAction implements IUserAction {
  public type: UserActionTypes;
  public payload: string;

  constructor(apiKey: string) {
    this.type = UserActionTypes.LOGIN;
    this.payload = apiKey;
  }
}

export class CreateUserAction implements IUserAction {
  public type: UserActionTypes;
  public payload: User;

  constructor(user: User) {
    this.type = UserActionTypes.CREATE;
    this.payload = user;
  }
}

export class UpdateUserAction implements IUserAction {
  public type: UserActionTypes;
  public payload: User;

  constructor(newUser: User) {
    this.type = UserActionTypes.UPDATE;
    this.payload = newUser;
  }
}

export class DeleteUserAction implements IUserAction {
  public type: UserActionTypes;
  public payload: string;

  constructor(apiKey: string) {
    this.type = UserActionTypes.DELETE;
    this.payload = apiKey;
  }
}

export class PromoteUserAction implements IUserAction {
  public type: UserActionTypes;
  public payload: {
    apiKey: string;
    promoteKey: string;
  };

  constructor(apiKey: string, promoteKey: string) {
    this.type = UserActionTypes.PROMOTE;
    this.payload = {
      apiKey,
      promoteKey,
    };
  }
}

export class UpdateStoredUserAction implements IUserAction {
  public type: UserActionTypes;
  public payload: IUser;

  constructor(user: IUser) {
    this.type = UserActionTypes.UPDATE_STORE;
    this.payload = user;
  }
}
