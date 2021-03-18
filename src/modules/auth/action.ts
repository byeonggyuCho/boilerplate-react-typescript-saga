import { AxiosError } from 'axios';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { UserType, LoginRes } from '@modules/auth';
export const SLIENT_REFRESH = {
  REQUEST: 'auth/SLIENT_REFRESH_REQUEST',
  SUCCESS: 'auth/SLIENT_REFRESH_SUCCESS',
  FAILURE: 'auth/SLIENT_REFRESH_FAILURE',
} as const;

export const LOGIN = {
  REQUEST: 'auth/LOGIN_REQUEST',
  SUCCESS: 'auth/LOGIN_SUCCESS',
  FAILURE: 'auth/LOGIN_FAILURE',
} as const;

export const CLEAR_LOGIN_INFO = 'auth/CLEAR_LOGIN_INFO' as const;

export const GET_USER_INFO = {
  REQUEST: 'auth/GET_USER_INFO_REQUEST',
  SUCCESS: 'auth/GET_USER_INFO_SUCCESS',
  FAILURE: 'auth/GET_USER_INFO_FAILURE',
} as const;

export const LOGOUT = {
  REQUEST: 'auth/LOGOUT_REQUEST',
  SUCCESS: 'auth/LOGOUT_SUCCESS',
  FAILURE: 'auth/LOGOUT_FAILURE',
} as const;

export const clearLoginInfo = createAction(CLEAR_LOGIN_INFO)();

/**
 * @description 서버API에서 넣어주기 전에 임시 적용
 */
export const SET_BRAND_COLOR = `auth/SET_BRAND_COLOR`;

export const SET_TEST_AUTH = `auth/SET_TEST_AUTH`;

/**
 * @description 사용자 정보 조회
 */
export const getUserInfo = createAsyncAction(
  GET_USER_INFO.REQUEST,
  [GET_USER_INFO.SUCCESS, (res: UserType) => res],
  [GET_USER_INFO.FAILURE, (err: AxiosError) => err]
)();

export const slientRefresh = createAsyncAction(
  SLIENT_REFRESH.REQUEST,
  [
    SLIENT_REFRESH.SUCCESS,
    (payload: { accessToken: string } | null) => payload,
  ],
  [SLIENT_REFRESH.FAILURE, (err: AxiosError) => err]
)();

export const logout = createAsyncAction(LOGOUT.REQUEST, LOGOUT.SUCCESS, [
  LOGOUT.FAILURE,
  (errorMsg: string) => errorMsg,
])();

const actions = {
  logout,
  slientRefresh,
  getUserInfo,
  clearLoginInfo,
};

export default actions;
