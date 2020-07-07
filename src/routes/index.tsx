import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/configureStore';
import NotFoundPage from '../pages/NotFoundPage.jsx'

const Root: React.FC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route  component={NotFoundPage} exact />
    </Switch>
   
  </ConnectedRouter>
)

export default Root;