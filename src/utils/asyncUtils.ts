import { call, put, fork, ForkEffect } from 'redux-saga/effects';
import { startLoading, finishLoading } from '@modules/loading/action';
import { AsyncActionType, SagaInterface } from '@modules';
import { ServerTransaction } from '@modules/api/client';
import {
  AsyncActionCreatorBuilder,
  PayloadAction,
  ActionType,
  createReducer,
  PayloadMetaAction,
} from 'typesafe-actions';
import DEMO_DATA from '@config/demo/brand';
import { createServerResponce } from '@utils/common';

export class ServerError extends Error {
  status: number;
  data: any;
  constructor(msg: string, status: number, data: any) {
    super(msg);
    this.status = status;
    this.data = data;
  }
}

export const isCollectResponse = (response: AxiosResponse<any>) => {
  // console.info(`[SAGA]\n httpStatus:${response.status}\n RES:`, response);
  return Math.floor(response.status * 0.01) === 2;
};

/**
 * @description 비동기 데이터 포멧
 */
export type AsyncState<T> = {
  loading: boolean;
  data: T;
  error: any | null;
};

/**
 * @description 리듀서에서 사용 할 수 있는 여러 유틸 함수들 입니다.
 */
export const reducerUtils = {
  /**
   * @description 비동기요청시 초기값을 설정합니다.
   */
  initial(initialData = null) {
    return {
      loading: false,
      data: initialData,
      error: null,
    };
  },
  /**
   * @description 비동기 요청이 로딩중인 상태일 때 사용합니다.
   * @param {any} prevState 이전 상태값을 유지하거나 초기화하는 용도로 사용합니다.
   */
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  // 성공 상태
  success: (payload: any) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  // 실패 상태
  error: (error: any) => ({
    loading: false,
    data: null,
    error: error,
  }),
};

export type PromiseCreatorFunction<R, S> =
  | ((payment: R) => Promise<S>)
  | (() => Promise<S>);

type CreateRequestSaga = (
  type: AsyncActionType,
  request: PromiseCreatorFunction<any, any>,
  otp?: {
    callback?: (param: any) => any;
    redirectionUrl?: string;
  }
) => SagaInterface<any>;

/**
 * @description 액션 타입추론과 리듀서 상태 추론 자동화를 위한 커스텀 함수.
 * @param state
 * @param action
 */
export function createCustomReducer<S, A extends { [key: string]: any }>(
  state: S,
  action: A
) {
  type Actions = ActionType<typeof action>;
  type States = typeof state;

  return createReducer<States, Actions>(state);
}

/**
 * @description  비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
 * @param {string} type 액션의 타입,
 * @param {string} key  상태의 key (예: posts, post) 입니다.
 * @param {boolean} keepData 기존 데이터를 유지할지 여부
 */
export const handleAsyncActions = (
  type: AsyncActionType,
  key: string,
  keepData = false,
  demo = false
) => <T extends { [prosp: string]: any }>(
  state: T,
  action: ActionType<any>
) => {
  switch (action.type) {
    case type.REQUEST:
      return {
        ...state,
        [key]: reducerUtils.loading(keepData ? state[key].data : null),
      };
    case type.SUCCESS:
      return {
        ...state,
        [key]: demo ? null : reducerUtils.success(action.payload),
      };
    case type.FAILURE:
      return {
        ...state,
        [key]: reducerUtils.error(action.payload),
      };
    default:
      return state;
  }
};

/**
 * @description action 이 payload 를 갖고 있는지 확인합니다.
 */
function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
  return action.payload !== undefined;
}

/**
 * @description   액션 타입을 추론하는 로직을 넣으면 사용할 예정
 */
export function createAsyncSaga<
  RequestType,
  RequestPayload,
  SuccessType,
  SuccessPayload,
  FailureType,
  FailurePayload
>(
  asyncAction: AsyncActionCreatorBuilder<
    [RequestType, [RequestPayload, undefined]],
    [SuccessType, [SuccessPayload, undefined]],
    [FailureType, [FailurePayload, undefined]]
  >,
  asyncFunction: ServerTransaction<RequestPayload, SuccessPayload>,
  successFunc?: (req: any, res?: any) => void,
  failureFunc?: any
  // option?: {
  //   mode?: 'demo' | 'normal';
  // }
) {
  return function* saga(
    action: ReturnType<typeof asyncAction.request>,
    option?: {
      mode?: 'demo' | 'normal';
    }
  ) {
    yield put(startLoading(action.type));
    try {
      let response: AxiosResponse<SuccessPayload>;

      // NOTE: demo인 경우에는 서버요청을 보내지 않는다.

      if (option?.mode === 'demo') {
        const { type } = asyncAction.request({} as RequestPayload);

        response = createServerResponce(DEMO_DATA[type]);

        // console.log('[DEMO_DATA]', type);
        console.log('[DEMO_DATA]', response);
      } else {
        response = yield call(
          asyncFunction, //api통신 함수에 req넣어 호출
          (action as any).payload
        );
      }

      const collectedResponse = isCollectResponse(response);
      if (collectedResponse) {
        if (successFunc) {
          // 추가함수가 있다면
          yield call(successFunc, (action as any).payload, response.data);
        }
        yield put(asyncAction.success(response.data));
      } else {
        throw new ServerError(
          'Server Responce Error...',
          response.status,
          response.data
        );
      }
    } catch (error) {
      if (failureFunc) {
        yield call(failureFunc, error.response);
      }

      yield put(asyncAction.failure(error.response));
    }
    yield put(finishLoading(action.type));
  };
}

export type MetaType = {
  id: string | number;
};
/**
 * @description 액션 타입을 추론하는 로직을 넣으면 사용할 예정
 */
export function createAsyncSagaById<
  RequestType,
  RequestPayload,
  SuccessType,
  SuccessPayload,
  FailureType,
  FailurePayload
>(
  asyncAction: AsyncActionCreatorBuilder<
    [RequestType, [RequestPayload, MetaType]],
    [SuccessType, [SuccessPayload, MetaType]],
    [FailureType, [FailurePayload, MetaType]]
  >,
  asyncFunction: PromiseCreatorFunction<
    RequestPayload,
    AxiosResponse<SuccessPayload>
  >,
  successFunc?: (...args: any[]) => any,
  failureFunc?: (...args: any[]) => any
) {
  return function* saga(
    action: ReturnType<typeof asyncAction.request>,
    option?: {
      mode?: 'demo' | 'normal';
    }
  ) {
    yield put(startLoading(action.type)); // 로딩 시작
    try {
      let response: AxiosResponse<SuccessPayload>;

      // NOTE: demo인 경우에는 서버요청을 보내지 않는다.
      console.log('[SAGA]', option?.mode);
      if (option?.mode === 'demo') {
        const { type } = asyncAction.request({} as any, {} as any);

        response = createServerResponce(DEMO_DATA[type]);

        console.log('[DEMO_DATA]', type);
        console.log('[DEMO_DATA]', response);
      } else {
        response = yield call(
          asyncFunction, //api통신 함수에 req넣어 호출
          (action as any).payload
        );
      }

      const collectedResponse = isCollectResponse(response);
      if (collectedResponse) {
        yield put(asyncAction.success(response.data, action.meta));
        if (successFunc) {
          yield call(successFunc, action.payload, response.data);
        }
      } else {
        throw new ServerError(
          'Server Responce Error...',
          response.status,
          response.data
        );
      }
    } catch (err) {
      if (failureFunc) {
        yield call(failureFunc, err);
      }
      yield put(asyncAction.failure(err, action.meta));
    }
    yield put(finishLoading(action.type)); // 로딩 끝
  };
}

export type AsyncAction<R, S, F> = {
  REQUEST: R extends string ? R : string;
  SUCCESS: S extends string ? S : string;
  FAILURE: F extends string ? F : string;
};

/**
 * @description id별로 처리하는 유틸함수, 단건 조회에서 사용하면 좋을것 같다.
 * @param type
 * @param key
 * @param keepData
 */
export const handleAsyncActionsById = (
  typeEntity: AsyncActionType,
  key: string,
  keepData = false
) => <T>(
  state: T extends { [props: string]: any } ? T : any,
  action: PayloadMetaAction<string, any, any>
) => {
  const { id } = action.meta;

  switch (action.type) {
    case typeEntity.REQUEST:
      return {
        ...state,
        [key]: {
          ...state[key],
          [id]: reducerUtils.loading(
            keepData ? state[key][id] && state[key][id].data : null
          ),
        },
      };
    case typeEntity.SUCCESS:
      return {
        ...state,
        [key]: {
          ...state[key],
          [id]: reducerUtils.success(action.payload),
        },
      };
    case typeEntity.FAILURE:
      return {
        ...state,
        [key]: {
          ...state[key],
          [id]: reducerUtils.error(action.payload),
        },
      };
    default:
      return state;
  }
};

/**
 * @deprecated 문자리터럴 추론이 불가능하여 사용하지 않습니다.
 * @param type
 */
export const createRequestActionTypes = (type: string) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return { REQUEST, SUCCESS, FAILURE };
};
