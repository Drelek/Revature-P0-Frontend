import { call, put, takeEvery } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import {
  CreateItemAction,
  DeleteItemAction,
  GetAllItemsAction,
  GetTaggedItemsAction,
  ItemActionTypes,
  UpdateItemAction,
  UpdateStoredItemsAction,
} from '../actions/ItemActions';
import {
  BeginLoadingAction,
  FinishLoadingAction,
} from '../actions/LoadingActions';
import { ToastAction } from '../actions/ToastActions';
import axiosBase from 'axios';

const API_URL = 'http://godmodelan.com/api/item/';
const axios = axiosBase.create({
  baseURL: API_URL,
});

function* fetchItems(): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.get, '');
    if (!response.data.success) throw response.data;
    yield put(
      new UpdateStoredItemsAction(response.data.data.Items).toPlainObject()
    );
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

function* createItem(
  action: CreateItemAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.post, '', action.payload);
    if (!response.data.success) throw response.data;
    yield put(
      new ToastAction({
        type: 'success',
        text1: 'Item created successfully',
        text2: action.payload.item.name,
      }).toPlainObject()
    );
    yield put(new GetAllItemsAction().toPlainObject());
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

function* getTaggedItems(
  action: GetTaggedItemsAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.get, `tagged/${action.payload}`);
    if (!response.data.success) throw response.data;
    yield put(
      new UpdateStoredItemsAction(response.data.data.items).toPlainObject()
    );
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

function* updateItem(
  action: UpdateItemAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.put, '', {
      apiKey: action.payload.apiKey,
      item: action.payload.item,
    });
    if (!response.data.success) throw response.data;
    yield put(
      new ToastAction({
        type: 'success',
        text1: 'Item updated successfully',
        text2: action.payload.item.name,
      }).toPlainObject()
    );
    yield put(new GetAllItemsAction().toPlainObject());
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

function* deleteItem(
  action: DeleteItemAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axiosBase.request, {
      method: 'delete',
      url: `${API_URL}`,
      data: action.payload,
    });
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

export default function* itemSaga() {
  yield takeEvery(ItemActionTypes.GET_ALL, fetchItems);
  yield takeEvery(ItemActionTypes.CREATE, createItem);
  yield takeEvery(ItemActionTypes.GET_TAGGED, getTaggedItems);
  yield takeEvery(ItemActionTypes.UPDATE, updateItem);
  yield takeEvery(ItemActionTypes.DELETE, deleteItem);
}
