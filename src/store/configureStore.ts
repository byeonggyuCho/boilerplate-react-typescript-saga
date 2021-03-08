import { createStore, applyMiddleware, Store, Action } from 'redux';
import { createBrowserHistory, History } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware as routerMiddlewareCreater } from 'connected-react-router';
import modules, { RootState } from '@modules';
import appConfig from '@config';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LOGOUT } from '@modules/auth/action';
import { CLEAR_STORE } from '@modules/base/action';

export const history: History = createBrowserHistory();

const { rootSaga, createRootReducer } = modules;

const persistConfig = {
  // reducer 객체의 어느 지점에서 부터 데이터를 저장할 것인지 설정해주는것이 key이다.
  // root부터 시작한다고 지정해준다.
  key: 'root',
  // 위에 import 한 성격의 storage를 지정해준다.
  storage: storage, // localstorage
  // 유지 및 보존하고 싶은 데이터를 배열안에 지정해준다.
  // string 형태이고 아래 combineReducers에 지정된 값들을 사용해주면 된다.
  whitelist: ['store', 'user', 'base', 'auth', 'report'],
};

const configureStore = function (
  history: History,
  preloadedState?: any
): Store<RootState, Action<any>> {
  const appReducer = createRootReducer(history);

  const rootReducer = (state: any, action: any) => {
    if ([LOGOUT.REQUEST, CLEAR_STORE].includes(action.type)) {
      storage.removeItem('persist:root');
      state = undefined;
    }
    return appReducer(state, action);
  };

  const persistedReducder = persistReducer(persistConfig, rootReducer);
  const routerMiddleware = routerMiddlewareCreater(history);
  const sagaMiddleware = createSagaMiddleware();

  // connected-react-router를 사용하지않고 saga에서 직접 history에 접근.
  // const sagaMiddleware = createSagaMiddleware({
  //   context:history
  // });
  const middlewareList = [routerMiddleware, sagaMiddleware];

  const store = createStore(
    // rootReducer,
    persistedReducder,
    preloadedState,
    appConfig.isProduct
      ? applyMiddleware(...middlewareList)
      : composeWithDevTools(applyMiddleware(...middlewareList))
  );

  // @Note: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
