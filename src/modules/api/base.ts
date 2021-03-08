import client, { ServerTransaction } from './client';

/**
 * @description 서버 상태 및 버전 확인
 */
export const serverHealthCheck: ServerTransaction<undefined, undefined> = () =>
  client.get('/v1/app/version');
