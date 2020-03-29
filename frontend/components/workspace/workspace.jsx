import React from 'react';
import { Sidebar } from './sidebar/sidebar';
import MessagesContainer from './messages/messages_container';

class Workspace extends React.Component {
  render() {
    const { currentChannel, match, history } = this.props;
    return (
      <div className="main-content-container">
        {/* <h1>Welcome to your workspace</h1>
        <button className="header-button" onClick={logout}>
          Log Out
        </button> */}
        <Sidebar currentChannel={currentChannel} history={history} />
        <MessagesContainer currentChannel={currentChannel} match={match} history={history} />
      </div>
    );
  }
}

export default Workspace;
