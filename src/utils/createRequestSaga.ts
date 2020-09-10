import { call, put, fork } from "redux-saga/effects";
import { startLoading, finishLoading } from "../actions/loading";
import { push } from "connected-react-router";
import { AsyncActionType, AsyncAPI, SagaInterface } from "../sagas/types";

class ServerError extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

type CreateRequestSaga = (
  type: AsyncActionType,
  request: AsyncAPI<any, any>,
  otp?: {
    callback?: (param: any) => any;
    data?: any; // 용도가??
    redirectionUrl?: string;
    // action?:boolean
  }
) => SagaInterface;

export const createRequestSaga: CreateRequestSaga = (type, request, otp) => {
  return function* (action) {
    yield put(startLoading(type.REQUEST)); // 로딩 시작
    try {
      const response = yield call(request, action.payload);

      console.log("[createRequestSaga]", type.REQUEST, "RES: ", response);

      if (response.status.toString().startsWith("2")) {
        // TODO: meta를 액션생성자함수로 넘기도록 수정하기... 라이브러리 사용법 찾아보기.
        yield put({
          type: type.SUCCESS,
          payload: response.data,
          meta: {
            headers: response.headers || {},
            requestData: action.payload,
          },
        });
      } else {
        throw new ServerError("Server Responce Error...", response.status);
      }

      if (otp && otp.callback) {
        yield fork(otp.callback, response.data);
      }

      if (otp && otp.redirectionUrl) {
        yield put(push(otp.redirectionUrl));
      }

      // if(otp && otp.action ){
      //   if(action.payload.action){
      //     yield put(action.payload.action)
      //   }
      // }
    } catch (e) {
      console.log("FAILURE!!!", e.response);

      yield put({
        type: type.FAILURE,
        payload: e.response,
        error: true,
      });
    }
    yield put(finishLoading(type.REQUEST)); // 로딩 끝
  };
};
