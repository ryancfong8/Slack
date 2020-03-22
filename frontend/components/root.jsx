import React from 'react';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, HashRouter, Route, IndexRoute, hashHistory, Redirect } from 'react-router-dom';
import App from './App';
import WorkspaceContainer from './workspace/workspace_container';
import { AuthRoute, MainRoute } from '../util/route_util.jsx';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <MainRoute exact={true} path="/" component={App} />
          <AuthRoute path="/messages/:channelId" component={WorkspaceContainer} />
          <AuthRoute path="/messages" component={WorkspaceContainer} />
        </Switch>
      </HashRouter>
    </Provider>
  );
};

export default Root;
