import React from 'react';
import { Link, hashHistory } from 'react-router-dom';

import SessionFormContainer from '../sessions/session_form_container';

class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }
  sessionLinks() {
    return <SessionFormContainer />;
  }

  personalGreeting(currentUser, logout) {
    return (
      <hgroup className="header-group">
        <h2 className="header-name">Hi, {currentUser.username}!</h2>
        <button className="header-button" onClick={logout}>
          Log Out
        </button>
      </hgroup>
    );
  }

  render() {
    return (
      <div className="header">
        <div className="icons">
          <Link className="logo" to="/">
            Slack
          </Link>
          {/* <a href="https://github.com/ryancfong8/Pleytime">
            <img
              className="Github"
              src="http://res.cloudinary.com/ryancfong8/image/upload/v1494284221/GitHub-Mark-64px_k8oysy.png"
              alt="Github"
            />
          </a>
          <a href="https://www.linkedin.com/in/ryanfong8">
            <img
              className="LinkedIn"
              src="http://res.cloudinary.com/ryancfong8/image/upload/v1494284174/In-Black-128px-TM_ybwajw.png"
              alt="LinkedIn"
            />
          </a> */}
        </div>
        {this.props.currentUser
          ? this.personalGreeting(this.props.currentUser, this.props.logout)
          : this.sessionLinks()}
      </div>
    );
  }
}

export default Greeting;
