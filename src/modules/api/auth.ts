import client, { ServerTransaction } from './client';
import { buildLink } from '@utils/common';
import { UserType, LoginForm, LoginRes } from '@modules/auth';
interface LoginReq {
  username: string;
  password: string;
}

/**
 * @description 로그인
 * @param {string} username
 * @param {string} password
 */
export const login: ServerTransaction<LoginForm, LoginRes> = ({
  username,
  password,
}: LoginReq) => client.post('/v1/auth/login', { username, password });

/**
 * @description  로그인 상태 확인
 */
export const check = () => client.get('/v1/auth/check');

/**
 * @description 로그아웃
 */
export const logout: ServerTransaction<undefined, undefined> = () =>
  client.post('/v1/auth/logout');

/**
 * @description 토큰 재발급
 */
export const slientRefresh: ServerTransaction<
  undefined,
  { accessToken: string }
> = () => client.get('/v1/auth/refresh');

/**
 * @description 사용자 정보 조회
 */
export const getUserInfo: ServerTransaction<undefined, UserType> = () =>
  client.get(`/v1/auth/me`);
