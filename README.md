# 어드민

## intro

서비스 운영현황을 모니터링할 수 있는 어드민 웹 입니다.

- [Repository](https://github.com/AlbaCheck/albacheck-admin-client)

## Skills

- React
- [material-ui](https://material-ui.com/)
- styled compoent
- Hooks
- Typescript
- scss
- redux(+redux-saga)

## 배포 가이드

```plantext
$ yarn install
$ yarn build
```

각 단계별 참조하는 `env`파일이 다름으로 빌드 명렁어도 달라져야 합니다.

1. develop

   ```plantext
   $ yarn build:develop
   ```

2. product

   ```plantext
   $ yarn build
   ```

## 참고문서

### 개발문서

- [스웨거](https://admin-api-dev.albacheck.com/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/)

### 기획문서

- [노션](https://www.notion.so/albacheck/35e9dba052eb46ae9f963d4608f442b2)
- [와이어 프레임](https://app.diagrams.net/#G1tpsVD3ym284tYd9_owgqGgObwo7qG9bL)
