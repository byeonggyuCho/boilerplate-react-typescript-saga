import { all } from "redux-saga/effects";
import { userSaga } from "./user";
import { storeSaga } from "./store";

export default function* rootSaga() {
  yield all([userSaga()]);
  yield all([storeSaga()]);
}
