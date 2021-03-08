const apiMocker = require('connect-api-mocker');
const proxy = require('./proxy'); // 위에서 작성한 proxy.js 파일의 함수
const path = require('path');

module.exports = devServerConfig = {
  https: process.env.HTTPS === 'true',

  // 개발환경에서 도메인을 맞춰야 하는 상황에서 사용한다. 예를 들면 쿠키 기반 인증은 인증 서버와 동일한 도메인으로 개발환경을 맞추어야 한다.
  host: 'localhost',
  port: process.env.PORT,

  //브라우저를 통해 접근하는 경로. 기본값은 ‘/’ 입니다.
  publicPath: '/',
  // 히스토리 API를 사용하는 SPA 개발 시 설정한다. 404가 발생하면 index.html로 리다이렉트한다.
  historyApiFallback: true,
  inline: true,
  disableHostCheck: true,
  //빌드시 에러나 경고를 브라우저 화면에 표시한다.
  overlay: true,

  // 정적 파일을 제공할 경로입니다.
  contentBase: path.resolve(__dirname, '../build'),
  index: 'index.html',
  // 서버 실행 시 터미널에 뿌려지는 메시지 수준을 정합니다. ‘none’, ‘errors-only’, ,‘minimal’ ‘normal’, ‘verbose’
  stats: 'normal',
  // 전체화면을 갱신하는 것이 아니라 변경한 컴포넌트만 갱신해주는 기능입니다.
  hot: true,
  proxy: process.env.PROXY_MIDDLEWARE === 'true' ? proxy() : {}, // 작성한 프록시 함수 적용.

  // key: fs.readFileSync('/path/to/server.key'),
  // cert: fs.readFileSync('/path/to/server.crt'),
  // ca: fs.readFileSync('/path/to/ca.pem'),

  before:
    process.env.MOCK_API === 'true'
      ? (app, server, compiler) => {
          console.log('[WDS] mock middleware');
          app.use(apiMocker('/v1/brand', 'mocks/api'));
        }
      : undefined,
};
