import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { NotFoundPage, Home, Paperbase } from "./pages";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";

const App: React.FC = () => {
  const isLogin = true;

  return (
    <>
      <Switch>
        <Route exact={true} path="/" component={Paperbase} />
        <Route exact={true} path="/home" component={Home} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </>
  );
};
export default App;
