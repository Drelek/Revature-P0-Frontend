import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import itemReducer from './ItemReducer';
import orderReducer from './OrderReducer';
import loadingReducer from './LoadingReducer';
import toastReducer from './ToastReducer';

const rootReducer = combineReducers({
  user: userReducer,
  items: itemReducer,
  orders: orderReducer,
  loading: loadingReducer,
  toast: toastReducer,
});

export default rootReducer;
