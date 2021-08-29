import { AxiosResponse } from 'axios';
import {
  CancelOrderAction,
  GetAllOrdersAction,
  OrderActionTypes,
  PlaceOrderAction,
  UpdateStoredOrdersAction,
} from '../actions/OrderActions';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import {
  BeginLoadingAction,
  FinishLoadingAction,
} from '../actions/LoadingActions';
import axiosBase from 'axios';
import { ToastAction } from '../actions/ToastActions';

const API_URL = 'http://godmodelan.com/api/order/';
const axios = axiosBase.create({
  baseURL: API_URL,
});

function* placeOrder(
  action: PlaceOrderAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.post, '', action.payload);
    if (!response.data.success) throw response.data;
    yield put(
      new ToastAction({
        type: 'success',
        text1: 'Order placed successfully',
        text2: `Receipt: ${response.data.data.receipt}`,
      }).toPlainObject()
    );
    yield put(new GetAllOrdersAction(action.payload.apiKey).toPlainObject());
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      }).toPlainObject()
    );
  }
  yield put(new FinishLoadingAction().toPlainObject());
}

function* getAllOrders(
  action: GetAllOrdersAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.get, action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredOrdersAction(response.data.data.orders));
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      }).toPlainObject()
    );
  }
  yield put(new FinishLoadingAction().toPlainObject());
}

function* cancelOrder(
  action: CancelOrderAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.request, {
      method: 'delete',
      url: API_URL,
      data: action.payload,
    });
    if (!response.data.success) throw response.data;
    yield put(
      new ToastAction({
        type: 'success',
        text1: 'Order cancelled successfully',
        text2: `Receipt: ${action.payload.receipt}`,
      }).toPlainObject()
    );
    yield put(new GetAllOrdersAction(action.payload.apiKey).toPlainObject());
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      }).toPlainObject()
    );
  }
  yield put(new FinishLoadingAction().toPlainObject());
}

export default function* orderSaga() {
  yield takeEvery(OrderActionTypes.PLACE, placeOrder);
  yield takeEvery(OrderActionTypes.GET_ALL, getAllOrders);
  yield takeEvery(OrderActionTypes.CANCEL, cancelOrder);
}
