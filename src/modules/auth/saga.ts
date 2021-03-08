import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  createAsyncSaga,
} from '@utils/asyncUtils';
import storage from '@utils/storage';
import * as authAPI from '@modules/api/auth';
import {
  LOGOUT,
  logout,
} from '@modules/auth/action';

const failure$ = function* () {
  storage.clear();
  yield put(logout.success());
  yield put(push('/login'));
};


const logoutSaga = createAsyncSaga(
  logout,
  authAPI.logout,
  function* successFunc() {
    storage.clear();

    yield put(push('/login'));
  },
  failure$
);


export default function* authSaga() {
  yield takeLatest(LOGOUT.REQUEST, logoutSaga);
}
