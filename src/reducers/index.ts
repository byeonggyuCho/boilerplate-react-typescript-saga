import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import user from "./user";
import store from "./store";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    store,
    user,
  });

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
