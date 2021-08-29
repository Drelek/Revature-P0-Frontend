import { IUser } from '../../models/User';
import { IUserAction, UserActionTypes } from '../actions/UserActions';

const initialState: IUser = {
  apiKey: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  admin: undefined,
};

export default function userReducer(
  state: IUser = initialState,
  action: IUserAction
) {
  switch (action.type) {
    case UserActionTypes.UPDATE_STORE:
      return action.payload;
    default:
      return state;
  }
}
