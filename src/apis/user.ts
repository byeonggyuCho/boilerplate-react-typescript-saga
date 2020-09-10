import client from "./client";
import { buildLink } from "../utils/common";

/**
 * @description 사용자 조회
 */
export const getUser = async (req: {
  userName: "string";
  loginId: "string";
  email: "string";
  phoneNumber: "string";
  page: number;
}) => client.get(`/admin/users${buildLink(req)}`);

/**
 * @description 사용자상세 조회
 * @param userId {string} 사용자 아이디
 */
export const getUsers = async (userId: string) =>
  client.get(`/admin/users/${userId}`);
