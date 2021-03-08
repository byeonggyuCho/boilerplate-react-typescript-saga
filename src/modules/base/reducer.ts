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
  modal: {},
  contextMenu: {},
  serverHealth: {
    status: true,
    message: '',
  },
  page: null,
  notification: [],
  menuList: [],
};

const base = createReducer<StateBase, BaseAction>(initialState, {
  [OPEN_MODAL]: (state, { payload: { type, ...modalInfo } }) => ({
    ...state,
    modal: {
      ...state.modal,
      [type]: {
        type,
        open: true,
        ...modalInfo,
      },
    },
  }),
  [CLOSE_MODAL]: (state, { payload: { type, ...rest } }) => ({
    ...state,
    modal: {
      ...state.modal,
      [type]: {
        ...state.modal[type],
        type,
        open: false,
      },
    },
  }),
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
  [OPEN_CONTEXT_MENU]: (state, { payload }) =>
    produce(state, (draftState) => {
      draftState.contextMenu[payload.type] = {
        ...payload,
        open: true,
      };
    }),
  [CLOSE_CONTEXT_MENU]: (state, { payload: optionType }) =>
    produce(state, (draftState) => {
      draftState.contextMenu[optionType] = {
        type: '',
        open: false,
        position: {
          bottom: '',
          top: '',
          left: '',
          right: '',
        },
        optionList: [],
      };
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
  [REMOVE_NOTIFICATION]: (state, { payload: notificationId }) => ({
    ...state,
    notification: state.notification.filter(
      (item) => item.id !== notificationId
    ),
  }),
  [GET_MENU]: (state, { payload: role }) => ({
    ...state,
    menuList: ROLE_MANU[role],
  }),
});

export default base;
