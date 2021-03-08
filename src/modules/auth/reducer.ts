import produce from 'immer';
import { createReducer, ActionType } from 'typesafe-actions';
import actions, {
  LOGIN,
  LOGOUT,
  CLEAR_LOGIN_INFO,
  GET_USER_INFO,
  SLIENT_REFRESH,
  SET_BRAND_COLOR,
  SET_TEST_AUTH,
} from './action';
import {
  reducerUtils,
  AsyncState,
  handleAsyncActions,
} from '@utils/asyncUtils';
import { User, LoginRes, BrandType } from '@modules/auth';
import { getBrandColor } from '@styles/brandColor';
import { BrandColor } from '@models/brand';
import { Authority } from '@models/auth';

export interface StateAuth {
  auth: AsyncState<LoginRes | null>;
  refresh: AsyncState<boolean | null>;
  brandManager: boolean;
  brand: BrandType | null;
  // brandColor: BrandColor | null;
  testAuth: Authority;
}

// TODO: brandColor depth정리 필요
export const initialState: StateAuth = {
  auth: reducerUtils.initial(null),
  refresh: reducerUtils.initial(null),
  brand: null,
  brandManager: false,
  testAuth: 'GUEST',
};

type AuthAction = ActionType<typeof actions>;

const auth = createReducer<StateAuth, AuthAction>(initialState, {
  [CLEAR_LOGIN_INFO]: (state) =>
    produce(state, (draftState) => {
      draftState.auth = reducerUtils.initial(null);
    }),
  [LOGIN.REQUEST]: (state, action) => {
    const newState = handleAsyncActions(LOGIN, 'auth')(state, action);

    return {
      ...newState,
      testAuth: action.payload.testAuth || state.testAuth,
    };
  },
  [LOGIN.SUCCESS]: (state, { payload: { user, brand, brandManager } }) => ({
    ...state,
    auth: reducerUtils.success({ user }),
    brand,
    brandManager,
  }),
  [LOGIN.FAILURE]: (state, action) =>
    handleAsyncActions(LOGIN, 'auth')(state, action),

  [LOGOUT.SUCCESS]: (state, { type }) =>
    handleAsyncActions(LOGOUT, 'auth')(state, { type, payload: null }),
  [LOGOUT.FAILURE]: (state, { type }) =>
    handleAsyncActions(LOGOUT, 'auth')(state, { type, payload: null }),
  [SLIENT_REFRESH.REQUEST]: (state, action) =>
    handleAsyncActions(SLIENT_REFRESH, 'refresh')(state, {
      ...action,
      payload: false,
    }),
  [SLIENT_REFRESH.SUCCESS]: (state, action) =>
    handleAsyncActions(SLIENT_REFRESH, 'refresh')(state, {
      ...action,
      payload: true,
    }),
  [SLIENT_REFRESH.FAILURE]: (state, action) =>
    handleAsyncActions(SLIENT_REFRESH, 'refresh')(state, {
      ...action,
      payload: false,
    }),

  [GET_USER_INFO.REQUEST]: (state, action) =>
    handleAsyncActions(GET_USER_INFO, 'auth')(state, action),

  [GET_USER_INFO.SUCCESS]: (state, action) =>
    handleAsyncActions(GET_USER_INFO, 'auth')(state, action),

  [GET_USER_INFO.FAILURE]: (state, action) =>
    handleAsyncActions(GET_USER_INFO, 'auth')(state, action),

  [SET_BRAND_COLOR]: (state, { payload }) => ({
    ...state,
    brandColor: getBrandColor(payload),
  }),
  [SET_TEST_AUTH]: (state, { payload }) => ({
    ...state,
    testAuth: payload,
  }),
});

export default auth;
