import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (loggedIn ? <Component {...props} /> : <Redirect to="/" />)} />
);

const Main = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) => (!loggedIn ? <Component {...props} /> : <Redirect to="/messages/1" />)}
  />
);

const mapStateToProps = (state) => {
  return { loggedIn: state.session && state.session.currentUser && state.session.currentUser.id };
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const MainRoute = withRouter(connect(mapStateToProps, null)(Main));
