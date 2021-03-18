import {
  takeLatest,
  put,
  delay,
  takeEvery,
  debounce,
} from 'redux-saga/effects';
import { createAsyncSaga } from '@utils/asyncUtils';
import * as baseAPI from '@modules/api/base';
import {
  SERVER_HEALTH_CHECK,
  MOVE_PAGE,
  SHOW_NOTIFICATION,
  removeNotification,
  showNotification,
  serverHealthCheck,
  openModal,
} from './action';
import { push } from 'connected-react-router';
import { SagaInterface, Action, FailureAction } from '../';
import config from '@config';

let _id = 0;
const showNotification$ = function* ({
  payload: text,
  type,
}: ReturnType<typeof showNotification>) {
  const nextId = ++_id;

  yield delay(config.notificationDelay);
  yield put(removeNotification(nextId));
};

const locationChangeSaga: SagaInterface<Action> = function* ({
  payload: { location },
}) {
  // if (location) {
  //   const [root, menuName] = (location.pathname as string).split('/');
  //   const menuRouter = menuList.find((item) => item.name === menuName);
  // }
};

/**
 * @description 서버상태를 체크한다.
 */
const serverHealthCheckSaga = createAsyncSaga(
  serverHealthCheck,
  baseAPI.serverHealthCheck
);

/**
 * @description 페이지 이동간 데이터를 전달합니다.
 */
const pageMoveSaga: SagaInterface<Action> = function* ({ payload }) {
  yield put(push(payload.url));
};

const handleFailure$ = function* ({ payload, error }: FailureAction) {
  if (error) {
    yield put(showNotification(error.message));
  }
};

const handleServerError$ = function* ({ payload, error }: FailureAction) {
  if (payload && !config.isProduct) {
    yield put(openModal({ type: 'networkError', data: payload }));
  }
};
const handleAuthError$ = function* ({ payload, error }: FailureAction) {
  if (payload) {
    yield put(
      openModal({
        type: 'errorModal',
        data: {
          description: '다른 디바이스에서 로그인되었습니다.',
        },
      })
    );
  }
};

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default function* baseSaga() {
  yield takeLatest(SERVER_HEALTH_CHECK.REQUEST, serverHealthCheckSaga);
  yield takeLatest(MOVE_PAGE, pageMoveSaga);
  yield takeLatest(LOCATION_CHANGE, locationChangeSaga);
  yield takeEvery(SHOW_NOTIFICATION, showNotification$);

  yield takeEvery(
    (action: any) => action.type.endsWith('_FAILURE'),
    handleFailure$
  );

  yield takeEvery(
    ({ type, payload }: any) =>
      type.endsWith('_FAILURE') && `${payload.status}`.startsWith('5'),
    handleServerError$
  );
  yield debounce(
    500,
    ({ type, payload }: any) =>
      type.endsWith('_FAILURE') && payload.status === 401,
    handleAuthError$
  );
}
