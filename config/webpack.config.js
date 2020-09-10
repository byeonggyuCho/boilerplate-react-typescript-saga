// webpack.common.js
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

const postcssNormalize = require("postcss-normalize");
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  entry: ["@babel/polyfill", "react-hot-loader/patch", "./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions", ">= 5% in KR"],
                    //크롬 최신버전과 하나 하위 버전까지 호환되도록 설정
                  },
                },
                "@babel/preset-react",
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "react-hot-loader/babel",
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: "/node_modules",
        loader: require.resolve("babel-loader"),
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false },
          },
        ],
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          "style-loader",
          {
            loader: "css-loader",
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
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
          "style-loader",
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: false,
              // camelCase: true,
              sourceMap: false,
            },
          },
          {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009",
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
            loader: require.resolve("sass-loader"),
            options: {
              sourceMap: false,
              sassOptions: {
                includePaths: [path.resolve(__dirname, "../styles")],
              },
            },
          },
        ],
      },

      {
        test: sassModuleRegex,
        use: [
          "style-loader",
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              // camelCase: true,
              sourceMap: false,
            },
          },
          {
            // Options for PostCSS as we reference these options twice
            // Adds vendor prefixing based on your specified browser support in
            // package.json
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009",
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
            loader: require.resolve("sass-loader"),
            options: {
              sourceMap: false,
              sassOptions: {
                includePaths: [path.resolve(__dirname, "../styles")],
              },
            },
          },
        ],
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: require.resolve("file-loader"),
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "public/favicon.ico",
    }),
    // DefinePlugin으로 'process.env.API_URL'를 process.env.API_URL 이라는 환경변수를 정의하고
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PAYPLE_URL: JSON.stringify(process.env.PAYPLE_URL),
        BASE_URL: JSON.stringify(process.env.BASE_URL),
      },
    }),
    // EnvironmentPlugin 이 뒤에 []에 해당하는 환경변수를 클라이언트로 전달해 준답니다.
    new webpack.EnvironmentPlugin({ ...process.env }),
    // new MiniCssExtractPlugin({
    //   filename: "static/css/[name].[contenthash:8].css",
    //   chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    // }),

    new webpack.NamedModulesPlugin({}),
    new CleanWebpackPlugin(),
  ],
};
