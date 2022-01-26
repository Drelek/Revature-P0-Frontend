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

const API_URL = 'http://onlineproductordering-env.eba-8kiskn5u.us-east-2.elasticbeanstalk.com/user/';
const axios = axiosBase.create({
  baseURL: API_URL,
});

function* fetchUser(
  action: LoginAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.get, action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction(response.data.data).toPlainObject());
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

function* createUser(
  action: CreateUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.post, '', action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction(response.data.data).toPlainObject());
  } catch (err) {
    console.log(err.response.data);
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

function* updateUser(
  action: UpdateUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.put, '', {
      ...action.payload,
      apiKey: action.payload.apiKey,
    });
    if (!response.data.success) throw response.data;
    console.log(response.data.data);
    yield put(new UpdateStoredUserAction(response.data.data).toPlainObject());
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

function* deleteUser(
  action: DeleteUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    const response = yield call(axios.delete, action.payload);
    if (!response.data.success) throw response.data;
    yield put(new UpdateStoredUserAction({}).toPlainObject());
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

function* promoteUser(
  action: PromoteUserAction
): Generator<unknown, any, AxiosResponse> {
  yield put(new BeginLoadingAction().toPlainObject());
  try {
    console.log(action.payload);
    const response = yield call(axios.put, '/promote/', action.payload);
    if (!response.data.success) throw response.data;
    yield put(
      new ToastAction({
        type: 'success',
        text1: 'API Call Succeeded',
        text2: 'User has been promoted',
      }).toPlainObject()
    );
  } catch (err) {
    console.log(err.response);
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

export default function* userSaga() {
  yield takeEvery(UserActionTypes.LOGIN, fetchUser);
  yield takeEvery(UserActionTypes.CREATE, createUser);
  yield takeEvery(UserActionTypes.UPDATE, updateUser);
  yield takeEvery(UserActionTypes.DELETE, deleteUser);
  yield takeEvery(UserActionTypes.PROMOTE, promoteUser);
}
