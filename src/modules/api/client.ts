import axios, { AxiosResponse } from 'axios';
import storage from '@utils/storage';

const client = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.defaults.timeout = process.env.TIME_OUT
  ? Number(process.env.TIME_OUT)
  : 2500;

/**
 * @description axios 통신함수 기본 포멧
 * @param req {generic} 요청 데이터 포멧
 * @param res {generic} 응답 데이터 포멧
 */
export type ServerTransaction<req, res> = (
  req: req //  undefined
) => Promise<AxiosResponse<res>>;

// var dataFormat = {
//   data: [
//     {
//       paymentId: 1,
//       priceOrg: 10000,
//       price: 9000,
//       payment_date: "2020년 7월 24일",
//     },
//     {
//       paymentId: 2,
//       priceOrg: 10000,
//       price: 9000,
//       payment_date: "2020년 7월 24일",
//     },
//   ],
//   status: 200,
//   statusText: "OK",
//   headers: {
//     connection: "close",
//     "content-type": "application/json;charset=UTF-8",
//     date: "Sat, 25 Jul 2020 05:52:25 GMT",
//     "transfer-encoding": "chunked",
//     "x-powered-by": "Express",
//   },
//   config: {
//     url: "/v1/payment/?userId=1234&page=1&size=10",
//     method: "get",
//     headers: {
//       Accept: "application/json",
//     },
//     baseURL: "/",
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     withCredentials: true,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//   },
//   request: {},
// };

/*
  글로벌 설정 예시:
  
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/' 
  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
  // 인터셉터 설정
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    }, 
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })  
*/

// client.interceptors.request.use((config) => {
//   const token = storage.get('accessToken');
//   if (token) {
//     config.headers.common['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

export default client;

export { AxiosResponse };
