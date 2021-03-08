module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: ['\\.test\\.ts$', '\\.test\\.tsx$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  // modulePathIgnorePatterns: ['<rootDir>/src/__test__/container/'],
  testPathIgnorePatterns: ['<rootDir>/src/__test__/container/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@src/(.*)': '<rootDir>/src/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@modules': '<rootDir>/src/modules/',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@config': '<rootDir>/src/config/',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__test__/setuptests.ts'],
  // 테스트 환경을 지정합니다.
  // 기본값은 `'jsdom'`이며 브라우저와 유사한 환경을 구성합니다.
  // `'node'`를 작성하면 NodeJS와 유사한 환경을 제공할 수 있습니다.
  // jsdom의 최신 버전을 별도 사용하는 경우에는, 다음과 같이 해당 모듈을 설치 후 옵션을 지정합니다.
  testEnvironment: 'jsdom',
};
