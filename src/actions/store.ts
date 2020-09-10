import { createAction, createAsyncAction } from "typesafe-actions";

/**
 * @description 매장 조회
 */
export const GET_STORES = {
  REQUEST: "store/GET_STORES_REQUEST",
  SUCCESS: "store/GET_STORES_SUCCESS",
  FAILURE: "store/GET_STORES_FAILURE",
} as const;

/**
 * @description 매장 상세 조회
 */
export const GET_STORE = {
  REQUEST: "store/GET_STORE_REQUEST",
  SUCCESS: "store/GET_STORE_SUCCESS",
  FAILURE: "store/GET_STORE_FAILURE",
} as const;

/**
 * @description 매장 상세 조회
 */
export const GET_BRANDS = {
  REQUEST: "store/GET_BRANDS_REQUEST",
  SUCCESS: "store/GET_BRANDS_SUCCESS",
  FAILURE: "store/GET_BRANDS_FAILURE",
} as const;

/**
 * @description 매장 직원 조회
 */
export const GET_STAFF = {
  REQUEST: "store/GET_STAFF_REQUEST",
  SUCCESS: "store/GET_STAFF_SUCCESS",
  FAILURE: "store/GET_STAFF_FAILURE",
} as const;

export const getStores = createAsyncAction(
  [
    GET_STORES.REQUEST,
    (payload: {
      brandType?: "string";
      storeType?: "string";
      storeName?: "string";
      crn?: "string";
      page: number;
    }) => payload,
  ],
  [GET_STORES.SUCCESS, (payload: any) => payload],
  [GET_STORES.FAILURE, (err: Error) => err]
)();

export const getStore = createAsyncAction(
  [GET_STORE.REQUEST, (storeId: string) => storeId],
  [GET_STORE.SUCCESS, (payload: any) => payload],
  [GET_STORE.FAILURE, (err: Error) => err]
)();

export const getBrands = createAsyncAction(
  GET_BRANDS.REQUEST,
  [GET_BRANDS.SUCCESS, (payload: any) => payload],
  [GET_BRANDS.FAILURE, (err: Error) => err]
)();

export const getStaff = createAsyncAction(
  [GET_STAFF.REQUEST, (storeId: string) => storeId],
  [GET_STAFF.SUCCESS, (payload: any) => payload],
  [GET_STAFF.FAILURE, (err: Error) => err]
)();

const actions = {
  getStores,
  getStore,
  getBrands,
  getStaff,
};

export default actions;
