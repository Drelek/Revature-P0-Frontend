import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/RootReducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
