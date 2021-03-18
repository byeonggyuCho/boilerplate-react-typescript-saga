import { createReducer, ActionType } from 'typesafe-actions';
import { produce } from 'immer';
import actions, {
  OPEN_SIDEBAR,
  OPEN_MODAL,
  CLOSE_MODAL,
  SERVER_HEALTH_CHECK,
  OPEN_CONTEXT_MENU,
  CLOSE_CONTEXT_MENU,
  MOVE_PAGE,
  PAGE_CLEAN,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  GET_MENU,
} from './action';

import { ROLE_MANU } from '@config';
import { BaseAction, StateBase } from './types';

export const initialState: StateBase = {
  sidebar: {
    open: false,
    menu: '',
    subMenu: '',
  },
  serverHealth: {
    status: true,
    message: '',
  },
  page: null,
  notification: [],
  menuList: [],
};

const base = createReducer<StateBase, BaseAction>(initialState, {
  [OPEN_SIDEBAR]: (state, { payload }) => ({
    ...state,
    sidebar: {
      ...state.sidebar,
      ...payload,
    },
  }),
  [SERVER_HEALTH_CHECK.REQUEST]: (state) =>
    produce(state, (draftState) => {
      draftState.serverHealth = initialState.serverHealth;
    }),

  [SERVER_HEALTH_CHECK.SUCCESS]: (state) => ({
    ...state,
    serverHealth: {
      ...state.serverHealth,
      status: true,
    },
  }),
  [SERVER_HEALTH_CHECK.FAILURE]: (state, { payload: error }) => ({
    ...state,
    serverHealth: {
      ...state.serverHealth,
      message: error.message,
      status: false,
    },
  }),
  [MOVE_PAGE]: (state, { payload }) => ({
    ...state,
    page: {
      ...state.page,
      ...payload,
    },
  }),
  [PAGE_CLEAN]: (state) => ({
    ...state,
    page: initialState.page,
  }),
  [PAGE_CLEAN]: (state) => ({
    ...state,
    page: initialState.page,
  }),
  // [SHOW_NOTIFICATION]: (state, action) => ({
  //   ...state,
  //   notification: initialState.page,
  // }),
  [ADD_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    notification: [...state.notification, payload],
  }),
});

export default base;
