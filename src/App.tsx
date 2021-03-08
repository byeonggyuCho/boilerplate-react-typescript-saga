import React, { lazy, Suspense, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { useSelector, shallowEqual } from 'react-redux';
import { Loading } from '@components/Molecules/Route';
import { RootState } from '@modules';

const App: React.FC = () => {
  return <Suspense fallback={<Loading />}></Suspense>;
};
export default isProduct() ? App : hot(module)(App);
