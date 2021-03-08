import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Test = () => <h1>테스트용 컴포넌트</h1>;
const withLoading = (WrappedComponent: React.FC) => (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then((result) => {
      console.log('데이터가 도착했습니다.', result.data);
      setIsLoading(false);
    });
  }, []);
  return isLoading ? (
    <div>이곳에 빙글빙글 돌아가는 스피너가 들어갑니다.</div>
  ) : (
    <WrappedComponent {...props} />
  );
};
export default function App() {
  const EnhancedTestComponent = withLoading(Test);
  return React.createElement(EnhancedTestComponent);
}
