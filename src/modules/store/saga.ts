import { takeLatest, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createAsyncSagaById, createAsyncSaga } from '@utils/asyncUtils';
import * as storeAPI from '@modules/api/store';
import { RootState } from '@modules';
import {
  ENTER_STORE,
  GET_STORE,
  GET_STORE_SUMMARY,
  GET_STORE_MEMBER,
  getStoreMember,
  getStoreSummary,
  getStore,
  getStoreById,
  GET_STORE_DETAIL,
  StoreDetailType,
} from './action';
import storage from '@utils/storage';

export const getEnteredStore$ = function* () {
  const storeInfo: StoreDetailType = yield select(
    (state: RootState) => state.store.enteredStore
  );

  return storeInfo;
};

const getStoreMemberSaga = createAsyncSagaById(
  getStoreMember,
  storeAPI.getStoreMember
);

const getStoreSummarySaga = createAsyncSaga(
  getStoreSummary,
  storeAPI.getStoreSummary
);

/**
 * @description 로그인시 매장 선택
 */
const enterStoreSaga = function* ({
  payload: storeInfo,
}: {
  type: string;
  payload: any;
}) {
  storage.set('store', storeInfo);

  yield put(push(`/store/@${storeInfo.storeId}/checklist`));
};

/**
 * @description 등록된 매장 리스트 조회
 */
const getStore$ = createAsyncSaga(getStore, storeAPI.getStore);

/**
 * @description 등록된 매장 상세조회
 */
const getStoreById$ = createAsyncSaga(getStoreById, storeAPI.getStoreById);

export default function* storeSaga() {
  yield takeLatest(GET_STORE.REQUEST, getStore$);
  yield takeLatest(GET_STORE_DETAIL.REQUEST, getStoreById$);
  yield takeLatest(GET_STORE_SUMMARY.REQUEST, getStoreSummarySaga);
  yield takeLatest(ENTER_STORE, enterStoreSaga);
  yield takeLatest(GET_STORE_MEMBER.REQUEST, getStoreMemberSaga);
}
