import client from "./client";
import { buildLink } from "../utils/common";

/**
 * @description 매장 상세 조회
 * @param brandType {string} 매장 아이디
 * @param storeType {string} 매장 아이디
 * @param storeName {string} 매장 아이디
 * @param crn {string} 매장 아이디
 * @param page {number} 페이지 번호
 */
export const getStores = async (req: {
  brandType?: "string";
  storeType?: "string";
  storeName?: "string";
  crn?: "string";
  page: number;
}) => client.get(`/admin/stores${buildLink(req)}`);

/**
 * @description 매장 상세 조회
 * @param storeId {string} 매장 아이디
 */
export const getStore = async (storeId: string) =>
  client.get(`
​/admin​/stores​/${storeId}`);

/**
 * @description 매장 브랜드 조회
 * @param  brandType {string}
 * @param  storeType {string}
 * @param  storeName {string}
 * @param  crn {string}
 * @param  page {number}
 */
export const getBrands = async (req: {
  brandType: "string";
  storeType: "string";
  storeName: "string";
  crn: "string";
  page: number;
}) => client.get(`/admin/stores/brands${buildLink(req)}`);

/**
 * @description 매장 직원 조회
 * @param storeId {string} 매장 아이디
 */
export const getStaff = async (storeId: string) =>
  client.get(`/admin/stores/${storeId}/staff`);
