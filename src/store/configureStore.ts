import { createStore, applyMiddleware } from "redux";
import createRootReducer from "../reducers";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas';
import { createBrowserHistory } from "history";
import { routerMiddleware as routerMiddlewareCreator } from "connected-react-router";


export const history = createBrowserHistory()
const routerMiddleware =  routerMiddlewareCreator(history);

const sagaMiddleware = createSagaMiddleware();

const rootReducer = createRootReducer(history);

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware,
      ),
    ),
  )

  sagaMiddleware.run(rootSaga);
  
  return store
}

export default configureStore