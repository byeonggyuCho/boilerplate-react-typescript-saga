# React, Typescript Boilerplate

## TEST

- 비지니스 로직에 한정.

### 테스크 케이스

- 테스트 케이스를 문서로 리스트업해서 관리하도록 합니다.

### 테스트 도구

- [`Jest`](https://jestjs.io/docs/en/getting-started.html)
- [`redux-saga-test-plan`](http://redux-saga-test-plan.jeremyfairbank.com/)
- [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/setup)

### 테스트 방법

터미널의 프로젝트 폴더 경로에서 다음 커맨드 실행

```plantext
$yarn test
```

### 테스스 범위

1. reducer

   - action에 따라 정상적인 상태를 반환하는가?

2. container component

   - store 접근 및 action dispatch 여부
   - 백엔드 API 호출 여부

3. prsentataional compoent

   - 변경된 store state에 대한 컴포넌트 렌더링 여부

4. redux-saga

   - saga flow를 정상적으로 타는가?
