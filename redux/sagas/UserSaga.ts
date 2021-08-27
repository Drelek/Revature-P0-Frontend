import { call, put, takeEvery } from '@redux-saga/core/effects';
import axiosBase, { AxiosResponse } from 'axios';
import {
  BeginLoadingAction,
  FinishLoadingAction,
} from '../actions/LoadingActions';
import { ToastAction } from '../actions/ToastActions';
import {
  CreateUserAction,
  DeleteUserAction,
  LoginAction,
  PromoteUserAction,
  UpdateStoredUserAction,
  UpdateUserAction,
  UserActionTypes,
} from '../actions/UserActions';

const API_URL = 'http://godemodelan.com/api/user/';
const axios = axiosBase.create({
  baseURL: API_URL,
});

function* fetchUser(
  action: LoginAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction());
  try {
    const response = yield call(axios.get, action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction(response.data.data));
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      })
    );
  }
  yield put(new FinishLoadingAction());
}

function* createUser(
  action: CreateUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction());
  try {
    const response = yield call(axios.post, '', action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction(response.data.data));
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      })
    );
  }
  yield put(new FinishLoadingAction());
}

function* updateUser(
  action: UpdateUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction());
  try {
    const response = yield call(axios.put, '', action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction(response.data.data));
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      })
    );
  }
  yield put(new FinishLoadingAction());
}

function* deleteUser(
  action: DeleteUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction());
  try {
    const response = yield call(axios.delete, action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction({}));
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      })
    );
  }
}

function* promoteUser(
  action: PromoteUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction());
  try {
    const response = yield call(axios.put, '/promote/', action.payload);
    if (!response.data.success) throw response.data;
    yield put(
      new ToastAction({
        type: 'success',
        text1: 'API Call Succeeded',
        text2: 'User has been promoted',
      })
    );
  } catch (err) {
    yield put(
      new ToastAction({
        type: 'error',
        text1: 'API Call Failed',
        text2: err.message,
      })
    );
  }
}

export default function* userSaga() {
  yield takeEvery(UserActionTypes.LOGIN, fetchUser);
  yield takeEvery(UserActionTypes.CREATE, createUser);
  yield takeEvery(UserActionTypes.UPDATE, updateUser);
  yield takeEvery(UserActionTypes.DELETE, deleteUser);
  yield takeEvery(UserActionTypes.PROMOTE, promoteUser);
}
