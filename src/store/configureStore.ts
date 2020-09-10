import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  Action,
  AnyAction,
} from "redux";
import { createBrowserHistory, History } from "history";
import createRootReducer, { RootState } from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { composeWithDevTools } from "redux-devtools-extension";

import { routerMiddleware as routerMiddlewareCreater } from "connected-react-router";

export const history: History = createBrowserHistory();

const configureStore = function (
  history: History,
  preloadedState?: any
): Store<RootState, any> {
  const rootReducer = createRootReducer(history);
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = routerMiddlewareCreater(history);
  const middlewareList = [routerMiddleware, sagaMiddleware];

  const store = createStore(
    // compose(
    rootReducer,
    preloadedState,
    process.env.NODE_ENV === "development"
      ? composeWithDevTools(applyMiddleware(...middlewareList))
      : applyMiddleware(...middlewareList)
    // )
  );

  // 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
