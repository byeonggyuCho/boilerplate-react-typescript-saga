import { produce } from "immer";
import { createReducer, ActionType } from "typesafe-actions";
import actions, {
  GET_BRANDS,
  GET_STAFF,
  GET_STORE,
  GET_STORES,
} from "../actions/store";

type StoreAction = ActionType<typeof actions>;

interface StateStore {}

export const initialState: StateStore = {};

const store = createReducer<StateStore, StoreAction>(initialState, {
  [GET_BRANDS.REQUEST]: (state) => produce(state, (draftState) => {}),
  [GET_STAFF.REQUEST]: (state, { payload }) =>
    produce(state, (draftState) => {}),
  [GET_STORE.REQUEST]: (state, { payload }) =>
    produce(state, (draftState) => {}),
  [GET_STORES.REQUEST]: (state, { payload }) =>
    produce(state, (draftState) => {}),
});

export default store;
