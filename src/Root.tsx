import React, { useEffect } from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store/configureStore';
import theme from '@styles/theme';
import { ThemeProvider } from '@styles/them-components';
import { GlobalStyle } from '@styles/global-style';
import { getCurrentDate, loadScript } from '@utils/common';
export const store = configureStore(history);
export const persistor = persistStore(store);

// 우클릭 막기
window.oncontextmenu = () => false;

const Root: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            {children ? children : <App />}
          </ConnectedRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Root;
