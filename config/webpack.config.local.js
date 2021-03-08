const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');
const { templateContent } = require('./template');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServerConfig = require('./devServer');

module.exports = merge(common, {
  mode: 'development',
  // devtool: 'cheap-module-source-map',
  devtool: 'eval-cheap-module-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: devServerConfig,

  plugins: [
    new HtmlWebpackPlugin({
      url: './',
      title: '알바체크 - A급 매장의 업무관리',
      hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
      // templateContent: ({ htmlWebpackPlugin }) =>
      //   templateContent(htmlWebpackPlugin),
      template: './public/index.html',
      filename: 'index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
});
