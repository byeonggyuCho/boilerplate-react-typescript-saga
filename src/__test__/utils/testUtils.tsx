// test-utils.js
import React, {
  ReactElement,
  FunctionComponent,
  ClassicComponent,
} from 'react';
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import initialReducerState from '@modules';
import createStore, { history } from '../../store/configureStore';
// import { StaticRouter, Route } from "react-router-dom";
type renderFunction = (
  ui: ReactElement,
  options?: {
    // initialState: any;
    store: Store;
    [props: string]: any;
  }
) => any;

/**
 * @description 기본값을 제공하기 위해서 커스텀
 * @param ui {ReactElement}: React 엘리먼트
 * @param options {} : render  옵션
 */
const render: renderFunction = (
  ui,
  options = {
    store: createStore(history),
  }
) => {
  const { store = createStore(history), ...renderOptions } = options;
  const Wrapper: React.FC = (props) => (
    <div data-testid="test-root-container">
      <Provider store={store}>
        <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
      </Provider>
    </div>
  );
  return { ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }), store };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
