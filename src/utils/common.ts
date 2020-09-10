import qs from "qs";

/**
 * @description 쿼리스트링 빌더
 * @param obj
 */
export const buildLink = (obj: any) => {
  const query = qs.stringify(obj);

  return `?${query}`;
};
