// webpack.common.js
const webpack = require('webpack');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const postcssNormalize = require('postcss-normalize');
const path = require('path');
const fs = require('fs');
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const dotenv = require('dotenv');

const en = dotenv.config({
  path: path.join(__dirname, process.env.NODE_ENV + '.env'),
});

// . mini-css-extract-plugin은 hot update가 유효하지 않ㄴ다.s

// override env
const envConfig = dotenv.parse(
  fs.readFileSync(path.join(__dirname, 'common.env'))
);
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
process.env.BUILD_DATE = new Date().toLocaleDateString();

// TODO: ForkTsCheckerWebpackPlugin
const isProduction = process.env.NODE_ENV === 'production';

console.log('[WEBPACK] NODE_ENV: ', process.env.NODE_ENV);
console.log('[WEBPACK] API_SERVER: ', process.env.BASE_URL);
console.log('[WEBPACK] BUILD_OUTPUT', path.resolve(__dirname, '../build'));

module.exports = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.tsx'],
  target: ['web', 'es5'],
  output: {
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: isProduction
      ? 'static/js/[name].[chunkhash:8].js'
      : 'static/js/[name].[hash:8].js',
    chunkFilename: isProduction
      ? 'static/js/[name].[chunkhash:8].chunk.js'
      : 'static/js/[name].[hash:8].chunk.js',

    environment: {
      // The environment supports arrow functions ('() => { ... }').
      // arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      // bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      // const: true,
      // The environment supports destructuring ('{ a, b } = obj').
      // destructuring: true,
      // The environment supports an async import() function to import EcmaScript modules.
      // dynamicImport: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      // forOf: true,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      // module: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              modules: 'true', //트리 쉐이킹
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    absoluteRuntime: false,
                    helpers: true, // 인라인 바벨 헬퍼 (classCallCheck, extends, 등)을 moduleName. 으로 치환
                    polyfill: true, // Promise, Set, Map 과 같은 새로운 내장 객체를 전역 오염없이 내부 객체를 참조하도록 변환
                    regenerator: true, // generator 함수를 전역 오염없이 regenerator runtime 을 사용하도록 변환
                    useESModules: false,
                  },
                ],
                '@babel/plugin-proposal-class-properties',
                'react-hot-loader/babel',
              ],
              presets: [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['ie 11', 'last 2 versions', '>= 5% in KR'],
                  },
                  useBuiltIns: 'usage',
                  corejs: 3,
                  shippedProposals: true,
                },
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: isProduction ? true : false },
          },
        ],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              // camelCase: true,
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              // camelCase: true,
              sourceMap: false,
            },
          },
        ],
      },

      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              // camelCase: true,
              sourceMap: false,
            },
          },
          {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                postcssNormalize(),
              ],
              sourceMap: false,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: false,
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../src/styles')],
                data: `@import 'test.scss';`, // 해당 코드 삽입
              },
            },
          },
        ],
      },

      {
        test: sassModuleRegex,
        use: [
          MiniCssExtractPlugin.loader, // 프로덕션 환경
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              // camelCase: true,
              sourceMap: false,
            },
          },
          {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                postcssNormalize(),
              ],
              sourceMap: false,
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              sourceMap: false,
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../src/styles')],
                data: `@import 'test.scss';`, // 해당 코드 삽입
              },
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      {
        // write files under 10k to inline or copy files over 10k
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      process: 'process/browser',
      '@': path.resolve(__dirname, '../src/'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@images': path.resolve(__dirname, '../src/assets/images'),
      '@fonts': path.resolve(__dirname, '../src/assets/fonts'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@containers': path.resolve(__dirname, '../src/containers'),
      '@config': path.resolve(__dirname, '../src/config'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@hoc': path.resolve(__dirname, '../src/hoc'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@modules': path.resolve(__dirname, '../src/modules'),
      '@models': path.resolve(__dirname, '../src/models'),
      '@modals': path.resolve(__dirname, '../src/modals'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@icons': path.resolve(__dirname, '../src/components/common/Icon'),
    },
  },
  plugins: [
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    // new webpack.BannerPlugin(banner),
    // new HtmlWebpackPlugin({
    //   url: './',
    //   title: '알바체크 - A급 매장의 업무관리',
    //   hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
    //   templateContent: ({ htmlWebpackPlugin }) =>
    //     templateContent(htmlWebpackPlugin),
    //   // template: './public/index.html',
    //   filename: 'index.html',
    //   favicon: 'public/favicon.ico',
    // }),
    // new webpack.DefinePlugin({
    //   "process.env": Object.keys(process.env).reduce((env, key) => {
    //     env[key] = JSON.stringify(process.env[key]);
    //     return env;
    //   }, {}),
    // }),
    // EnvironmentPlugin 이 뒤에 []에 해당하는 환경변수를 클라이언트로 전달해 준답니다.
    new webpack.EnvironmentPlugin({
      ...process.env,
    }),

    // webpack.NamedModulesPlugin({}),
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/axios/dist/axios.min.js',
          // to: './axios.min.js', // 목적지 파일에 들어간다
          to: './static/js/axios.min.js', // 목적지 파일에 들어간다
        },
      ],
    }),

    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      basePath: './build/',
    }),

    new MiniCssExtractPlugin({
      filename: isProduction
        ? 'static/css/[name].[contenthash:8].css'
        : 'static/css/[name].[hash:8].css',
      chunkFilename: isProduction
        ? 'static/css/[name].[contenthash:8].chunk.css'
        : 'static/css/[name].[hash:8].chunk.css',
    }),
  ],
};
