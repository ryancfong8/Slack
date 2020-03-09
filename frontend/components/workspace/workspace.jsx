import React from 'react';

class Workspace extends React.Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>Welcome to your workspace</h1>
        <button className="header-button" onClick={logout}>
          Log Out
        </button>
      </div>
    );
  }
}

export default Workspace;
