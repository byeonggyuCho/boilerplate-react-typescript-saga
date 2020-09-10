const { merge } = require("webpack-merge");
const dotenv = require("dotenv");
const common = require("./webpack.config.js");
const webpack = require("webpack");
const path = require("path");
dotenv.config({
  path: `./config/develop.env`,
});
const proxy = require("./proxy"); // 위에서 작성한 proxy.js 파일의 함수

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  plugins: [new webpack.HotModuleReplacementPlugin({})],
  devServer: {
    disableHostCheck: true,
    overlay: true, //빌드시 에러나 경고를 브라우저 화면에 표시합니다.
    contentBase: path.resolve(__dirname, "../build"),
    index: "index.html",
    stats: "errors-only", // 서버 실행 시 터미널에 뿌려지는 메시지 수준을 정합니다. ‘none’, ‘errors-only’, ‘minimal’, ‘normal’, ‘verbose’
    // hot: true, //전체화면을 갱신하는 것이 아니라 변경한 컴포넌트만 갱신해주는 기능입니다.

    proxy: proxy(), // 작성한 프록시 함수 적용.
    // https: true,
    // key: fs.readFileSync('/path/to/server.key'),
    // cert: fs.readFileSync('/path/to/server.crt'),
    // ca: fs.readFileSync('/path/to/ca.pem'),

    host: "localhost",
    port: 8080,
    publicPath: "/", //브라우저를 통해 접근하는 경로. 기본값은 ‘/’ 입니다.
    historyApiFallback: true, // 히스토리 API를 사용하는 SPA 개발시 설정합니다. 404가 발생하면 index.html로 리다이렉트합니다.
  },
});
