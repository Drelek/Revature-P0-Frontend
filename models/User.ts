export interface IUser {
  apiKey: string;
  firstName: string;
  lastName: string;
  email: string;
  admin?: boolean;
}

export class User implements IUser {
  public apiKey: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public admin?: boolean;

  constructor(input: any) {
    this.apiKey = input.apiKey;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    if (input.admin) this.admin = input.admin;
  }
}

export default User;
