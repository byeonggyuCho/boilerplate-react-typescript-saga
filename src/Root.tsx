import React from "react";
// import "./index.scss";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store/configureStore";

const store = configureStore(history);

function mouseRightClick() {
  // 우클릭 막기
  window.oncontextmenu = () => false;
}
mouseRightClick();

const Root: React.FC = (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {props.children ? props.children : <App />}
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
