import React from 'react';
import { Sidebar } from './sidebar/sidebar';
import MessagesContainer from './messages/messages_container';
import { Details } from './details';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute } from '../../util/route_util.jsx';

class Workspace extends React.Component {
  render() {
    const { currentChannel, match, history, currentUser, updateChannel } = this.props;
    return (
      <div className="main-content-container">
        {/* <h1>Welcome to your workspace</h1>
        <button className="header-button" onClick={logout}>
          Log Out
        </button> */}
        <Sidebar currentChannel={currentChannel} history={history} match={match} />
        <MessagesContainer currentChannel={currentChannel} match={match} history={history} />
        <Switch>
          <Route
            exact={true}
            path="/messages/:channelId/details/:modifier?"
            render={props => (
              <Details
                {...props}
                channel={currentChannel}
                currentUserId={currentUser.id}
                updateChannel={updateChannel}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Workspace;
