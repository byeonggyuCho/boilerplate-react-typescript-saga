import { createReducer, ActionType } from 'typesafe-actions';
import actions from './action';

export type StateAuth = any;

export const initialState: StateAuth = {};

type AuthAction = ActionType<typeof actions>;

const auth = createReducer<StateAuth, AuthAction>(initialState, {});

export default auth;
