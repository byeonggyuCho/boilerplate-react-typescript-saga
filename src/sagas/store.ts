import { takeLatest, put } from "redux-saga/effects";
import { createRequestSaga } from "../utils/createRequestSaga";
import * as storeAPI from "../apis/store";
import { GET_BRANDS, GET_STAFF, GET_STORE, GET_STORES } from "../actions/store";
import { push } from "connected-react-router";

const getStoreSaga = createRequestSaga(GET_STORE, storeAPI.getStore);
const getStoresSaga = createRequestSaga(GET_STORES, storeAPI.getStores);
const getBrandsSaga = createRequestSaga(GET_BRANDS, storeAPI.getBrands);
const getStaffSaga = createRequestSaga(GET_STAFF, storeAPI.getStaff);

export function* storeSaga() {
  yield takeLatest(GET_STORE.REQUEST, getStoreSaga);
  yield takeLatest(GET_STORES.REQUEST, getStoresSaga);
  yield takeLatest(GET_BRANDS.REQUEST, getBrandsSaga);
  yield takeLatest(GET_STAFF.REQUEST, getStaffSaga);
}
