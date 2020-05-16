import React from 'react';

import Sidebar from './sidebar/sidebar';
import MessagesContainer from './messages/messages_container';
import { Details } from './right_sidebar/details';
import { Switch, Route } from 'react-router-dom';
import UserPage from './right_sidebar/user_page';

class Workspace extends React.Component {
  render() {
    const {
      currentChannel,
      match,
      history,
      currentUser,
      updateUser,
      updateChannel,
      selectedUser,
      getUser,
      getMessages,
      location,
      receiveHighlightedMessage,
    } = this.props;
    return (
      <div className="main-content-container">
        {/* <h1>Welcome to your workspace</h1>
        <button className="header-button" onClick={logout}>
        Log Out
      </button> */}
        <Sidebar
          currentChannel={currentChannel}
          history={history}
          match={match}
          receiveHighlightedMessage={receiveHighlightedMessage}
        />
        <MessagesContainer currentChannel={currentChannel} match={match} history={history} location={location} />
        <Switch>
          <Route
            exact={true}
            path="/messages/:channelId/details/:modifier?"
            render={(props) => (
              <Details
                {...props}
                channel={currentChannel}
                currentUserId={currentUser.id}
                updateChannel={updateChannel}
              />
            )}
          />
          <Route
            exact={true}
            path="/messages/:channelId/users/:userId"
            render={(props) => (
              <UserPage
                {...props}
                currentChannel={currentChannel}
                currentUser={currentUser}
                updateUser={updateUser}
                selectedUser={selectedUser}
                getUser={getUser}
                getMessages={getMessages}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Workspace;
