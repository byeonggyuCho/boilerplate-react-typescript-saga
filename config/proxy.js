const dotenv = require("dotenv");

dotenv.config({
  path: `./dev.env`,
});

module.exports = function (entry) {
  return [
    {
      // "/**": {
      // 모든 요청을 백엔드로 bypass
      context: ["/v1", "/health", "/code"],
      target: process.env.PROXY_URL,
      // target: {
      //   protocol: process.env.PROXY_PROTOCOL, // 백엔드 프로토콜 'http'
      //   host: process.env.PROXY_HOST, // 백엔드 호스트 'localhost'
      //   port: process.env.PROXY_PORT, // 백엔드 포트 '8080'
      // },
      onProxyReq: function (proxyReq) {
        // proxyReq.setHeader("Cookie", "JSESSIONID=" + ProxySession[buildType].JSESSIONID + ";msa=" + ProxySession[buildType].msa + ";msa_rmc=" + ProxySession[buildType].msa_rmc + ";msa_rmc_disabled=" + ProxySession[buildType].msa_rmc);
      },
      onProxyRes: proxyProcessing(process.env.ASSETS_PUBLIC_PATH, entry),
      // HTML 구분 및 스크립트 처리 로직. 후술
      // },
      ignorePath: false,
      changeOrigin: true,
      // secure: true,
      secure: false,
      withCredentials: true,
    },
  ];
};

/**
 * 백엔드로부터 받은 응답이 HTML이면 스크립트를 삽입하는 함수.
 *
 * @param publicPath Webpack config의 publicPath. 이 주소가 static 요소의 baseURL로 사용된다
 * @param entry Webpack config의 entry 객체
 * @returns {Function} 프록시 처리 함수
 */
function proxyProcessing(publicPath, entry) {
  // 파라미터로 입력받은 publicPath와 entry 정보로 js script 삽입 코드를 생성하는 함수. 후술
  const script = entryToScript(publicPath, entry);

  return function (proxyRes, request, response) {
    if (
      request.originalUrl === "/" && // <== 스크립트를 삽입할 페이지의 URL.
      // 이 구문을 생략하면 모든 페이지에 스크립트 삽입됨
      proxyRes.headers &&
      proxyRes.headers["content-type"] &&
      proxyRes.headers["content-type"].match("text/html")
    ) {
      // content type이 HTML인지 체크

      const _write = response.write;

      response.write = function (data) {
        if (data && data.toString) {
          // HTML 문자열 마지막에 스크립트 태그를 끼워넣는 함수. 후술
          return _write.apply(response, [
            appendScriptToHtml(data.toString(), script),
          ]);
        } else {
          return _write.apply(response, arguments);
        }
      };
    }
  };
}

/**
 * Webpack Entry Point를 스크립트 태그로 리턴하는 함수
 *
 * @param publicPath Webpack Config의 public path인 js파일 폴더 경로
 * @param entry {Array|Object|String} js파일이 될 엔트리 포인트 설정
 * @returns {string} 스크립트 삽입 태그
 */
function entryToScript(publicPath, entry) {
  let files;

  // Webpack Entry Point는 배열, 객체, 문자를 지원하므로 분기 처리
  if (entry instanceof Array) {
    files = entry
      .map((str) => str.split("/"))
      .map((arr) => arr[arr.length - 1]);
  } else if (entry instanceof Object) {
    files = Object.keys(entry).map((key) => key + ".js");
  } else {
    files = [entry];
  }

  // public path와 파일명을 합쳐 스크립트 삽입 태그로 변경
  return files
    .map((name) => `<script src="${publicPath}${name}"></script>`)
    .join("");
}

/**
 * @description HTML 파일 마지막 라인에 스크립트 태그를 추가하는 함수
 * 만약 템플릿에서 직접 스크립트 태그를 삽입한다면 이 부분은 생략할 것.
 * @param html 스크립트 삽입 코드를 끼워넣을 HTML 문자열
 * @param script 끼워넣을 스크립트 태그 (<script src="...">)
 * @returns {string} 스크립트 태그가 끼워넣어진 HTML 문자열
 */
function appendScriptToHtml(html, script) {
  if (html.includes("</html>")) {
    html = html.replace("</html>", script + "</html>");
  }
  return html;
}
