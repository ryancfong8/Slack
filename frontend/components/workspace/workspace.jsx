import React from 'react';
import { Sidebar } from './sidebar/sidebar';
import MessagesContainer from './messages/messages_container';

class Workspace extends React.Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        {/* <h1>Welcome to your workspace</h1>
        <button className="header-button" onClick={logout}>
          Log Out
        </button> */}
        <Sidebar />
        {/* <MessagesContainer /> */}
      </div>
    );
  }
}

export default Workspace;
