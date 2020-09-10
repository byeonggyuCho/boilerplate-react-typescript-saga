import { takeLatest, put } from "redux-saga/effects";
import { createRequestSaga } from "../utils/createRequestSaga";
import { push } from "connected-react-router";
import * as userAPI from "../apis/user";
import { GET_USER, GET_USERS } from "../actions/user";

const getUserSaga = createRequestSaga(GET_USER, userAPI.getUser);
const getUsersSaga = createRequestSaga(GET_USERS, userAPI.getUsers);

export function* userSaga() {
  yield takeLatest(GET_USER.REQUEST, getUserSaga);
  yield takeLatest(GET_USERS.REQUEST, getUsersSaga);
}
