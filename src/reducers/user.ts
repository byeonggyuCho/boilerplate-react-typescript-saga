import { produce } from "immer";
import { createReducer, ActionType } from "typesafe-actions";
import actions, { GET_USER, GET_USERS } from "../actions/user";

type StoreAction = ActionType<typeof actions>;

interface StateStore {}

export const initialState: StateStore = {};

const user = createReducer<StateStore, StoreAction>(initialState, {
  [GET_USER.REQUEST]: (state) => produce(state, (draftState) => {}),
  [GET_USERS.REQUEST]: (state, { payload }) =>
    produce(state, (draftState) => {}),
});

export default user;
