import { createAction, createAsyncAction } from "typesafe-actions";

/**
 * @description 사용자 조회
 */
export const GET_USERS = {
  REQUEST: "store/GET_USERS_REQUEST",
  SUCCESS: "store/GET_USERS_SUCCESS",
  FAILURE: "store/GET_USERS_FAILURE",
} as const;

/**
 * @description 매장 상세 조회
 */
export const GET_USER = {
  REQUEST: "store/GET_USER_REQUEST",
  SUCCESS: "store/GET_USER_SUCCESS",
  FAILURE: "store/GET_USER_FAILURE",
} as const;

const getUser = createAsyncAction(
  [
    GET_USER.REQUEST,
    (payload: {
      userName: "string";
      loginId: "string";
      email: "string";
      phoneNumber: "string";
      page: number;
    }) => payload,
  ],
  [GET_USER.SUCCESS, (payload: any) => payload],
  [GET_USER.FAILURE, (err: Error) => err]
)();
const getUsers = createAsyncAction(
  [GET_USERS.REQUEST, (userId: string) => userId],
  [GET_USERS.SUCCESS, (payload: any) => payload],
  [GET_USERS.FAILURE, (err: Error) => err]
)();

const actions = {
  getUser,
  getUsers,
};

export default actions;
