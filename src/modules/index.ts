import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';

import { connectRouter } from 'connected-react-router';
import { History } from 'history';

function* rootSaga() {
  yield all([
    auth.saga(),
    base.saga(),
  ]);
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: auth.reducer,
    base: base.reducer,
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default {
  createRootReducer,
  rootSaga,
};

export interface Action {
  payload: any;
  type: string;
  meta?: any;
}

export interface FailureAction {
  payload: any;
  type: string;
  error: any;
}

export interface AsyncActionType {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

export interface SagaInterface<T> {
  (action: T extends Action ? T : Action): any;
}

export interface AsyncAPI<reqData, resData> {
  (req?: reqData): Promise<resData>;
}
