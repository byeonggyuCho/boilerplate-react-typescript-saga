import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Root from './routes';
import configureStore from './store/configureStore'

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Root />, 
  </Provider>,
  document.getElementById('app')
);