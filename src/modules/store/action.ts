import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  StoreDetailType,
  StoreMemberType,
  StoreSummaryType,
} from '@models/store';
import { AxiosError } from 'axios';
export { StoreDetailType };
import { MetaType } from '@utils/asyncUtils';

/**
 * @description 리프레시를 할 때 임시로 매장을 선택한다.
 */
export const TEMP_ENTER_STORE = 'store/TEMP_ENTER_STORE' as const;

/**
 * @description 매장을 선택한다.
 */
export const ENTER_STORE = 'store/ENTER_STORE' as const;

/**
 * @description 입장 매장 정보를 초기화한다.
 */
export const CLEAR_ENTER_STORE = 'store/CLEAR_ENTER_STORE' as const;

/**
 * @description (다건) 매장의 직원 목록 조회
 */
export const GET_STORE_MEMBER = {
  REQUEST: 'store/GET_STORE_MEMBER_REQUEST',
  SUCCESS: 'store/GET_STORE_MEMBER_SUCCESS',
  FAILURE: 'store/GET_STORE_MEMBER_FAILURE',
} as const;

/**
 * @description 업무 추가 (복수)
 */
export const ADD_TASKS = {
  REQUEST: 'store/ADD_TASKS_REQUEST',
  SUCCESS: 'store/ADD_TASKS_SUCCESS',
  FAILURE: 'store/ADD_TASKS_FAILURE',
} as const;

/**
 * @description 업무 삭제
 */
export const DELETE_TASK = {
  REQUEST: 'store/DELETE_TASK_REQUEST',
  SUCCESS: 'store/DELETE_TASK_SUCCESS',
  FAILURE: 'store/DELETE_TASK_FAILURE',
} as const;

/**
 * @description 사용자가 등록한 매장 목록을 불러온다.
 */
export const GET_STORE = {
  REQUEST: 'store/GET_STORE_REQUEST',
  SUCCESS: 'store/GET_STORE_SUCCESS',
  FAILURE: 'store/GET_STORE_FAILURE',
} as const;

/**
 * @description 사용자가 등록한 매장 목록을 불러온다.
 */
export const GET_STORE_SUMMARY = {
  REQUEST: 'store/GET_STORE_SUMMARY_REQUEST',
  SUCCESS: 'store/GET_STORE_SUMMARY_SUCCESS',
  FAILURE: 'store/GET_STORE_SUMMARY_FAILURE',
} as const;

/**
 * @description 매장의 상세정보를 조회한다.
 */
export const GET_STORE_DETAIL = {
  REQUEST: 'store/GET_STORE_DETAIL_REQUEST',
  SUCCESS: 'store/GET_STORE_DETAIL_SUCCESS',
  FAILURE: 'store/GET_STORE_DETAIL_FAILURE',
} as const;

export const enterStore = createAction(
  ENTER_STORE,
  (payload: StoreDetailType) => payload
)();

// 현재 선택된 카테고리를 변경한다.
export const clearEnterStore = createAction(CLEAR_ENTER_STORE)();

export const tempEnterStore = createAction(
  TEMP_ENTER_STORE,
  (payload: StoreDetailType) => payload
)();

/**
 * @description 매장 상세조회
 */
export const getStoreById = createAsyncAction(
  [GET_STORE_DETAIL.REQUEST, (storeId: number) => storeId],
  [GET_STORE_DETAIL.SUCCESS, (payload: StoreDetailType) => payload],
  [GET_STORE_DETAIL.FAILURE, (err: AxiosError) => err]
)();

/**
 * @description 서비스 플랜페이지에서 등록된 매장 리스트를 조회한다.
 */
export const getStore = createAsyncAction(
  GET_STORE.REQUEST,
  [GET_STORE.SUCCESS, (payload: StoreDetailType[]) => payload],
  [GET_STORE.FAILURE, (err: AxiosError) => err]
)();

/**
 * @description 서비스 플랜페이지에서 등록된 매장 리스트를 조회한다.
 */
export const getStoreSummary = createAsyncAction(
  GET_STORE_SUMMARY.REQUEST,
  [GET_STORE_SUMMARY.SUCCESS, (payload: StoreSummaryType[]) => payload],
  [GET_STORE_SUMMARY.FAILURE, (err: AxiosError) => err]
)();

/**
 * @description 매장 직원 목록 조회
 */
export const getStoreMember = createAsyncAction(
  [
    GET_STORE_MEMBER.REQUEST,
    (storeId: number) => storeId,
    (storeId: number): MetaType => ({
      id: storeId,
    }),
  ],
  [
    GET_STORE_MEMBER.SUCCESS,
    (payload: StoreMemberType[], meta: MetaType) => payload,
    (data: StoreMemberType[], meta: MetaType) => meta,
  ],
  [
    GET_STORE_MEMBER.FAILURE,
    (payload: AxiosError, meta: MetaType) => payload,
    (payload: AxiosError, meta: MetaType) => meta,
  ]
)();

const actions = {
  clearEnterStore,
  enterStore,

  getStore,
  getStoreById,
  getStoreSummary,
  getStoreMember,
};

export default actions;
