const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const shouldUseSourceMap = false;

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    nodeEnv: 'production',
    minimize: true,
    removeAvailableModules: true,

    // three shaking
    concatenateModules: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: shouldUseSourceMap,
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            drop_console: false, // 콘솔 로그를 제거한다
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          keep_classnames: false,
          keep_fnames: false,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true,
              }
            : false,
        },
      }),
    ],
    // Automatically split vendor and commons
    // https://webpack.js.org/plugins/split-chunks-plugin/
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366

    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 40000,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 6,
      automaticNameDelimiter: '~',
      cacheGroups: {
        // vendor 코드 (dependencies)들을 다른 chunk에 분리하기
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          name: 'runtime',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },

    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: 'public/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: '127.0.0.1',
      analyzerPort: 7777,
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'stats.json',
      reportFilename: 'report.html',
    }),
  ],
});
