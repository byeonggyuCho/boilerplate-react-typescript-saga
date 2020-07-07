module.exports = {
    mode: 'development',
  
    // 엔트리 포인트 
    entry: "./src/index.tsx",
  
    // 빌드 결과물을 dist/main.js에 위치
    output: {
      filename: "main.js",
      path: __dirname + "/dist"
    },
  
    // 디버깅을 위해 빌드 결과물에 소스맵 추가
    devtool: "source-map",

    // 개발 서버정보.
    devServer: {
        contentBase: './',
        publicPath: '/dist', // 정적파일 위치.
        historyApiFallback: true,
      },
  
    resolve: {
      // 파일 확장자 처리
      extensions: [".ts", ".tsx", '.js']
    },
  
    module: {
      rules: [
        // .ts나 .tsx 확장자를 ts-loader가 트랜스파일 
        { 
            test: /\.tsx?$/, 
            loader: "ts-loader" 
        },
      ]
    },
  };