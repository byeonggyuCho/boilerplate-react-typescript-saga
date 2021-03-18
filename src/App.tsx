import React, { lazy, Suspense, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { isProduct } from '@utils/common';
import Button from '@components/Atom/Button';

const Loading: React.FC = () => <div>로딩</div>;

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Button />
    </Suspense>
  );
};
export default isProduct() ? App : hot(module)(App);
