import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
// import "./styles/normalize.css";
import "./styles/reset.css";
import "./styles/base.css";
import Root from "./Root";

// const { hot } = require('react-hot-loader/root');

// import { hot } from "react-hot-loader/root";

// const Hot = hot(Root);

ReactDOM.render(<Root />, document.getElementById("root"));
