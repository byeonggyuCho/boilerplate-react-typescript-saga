import client from './client';


// 로그인
export const api_test = (req:any) =>
  client.post('/api/auth/api_test', req);
