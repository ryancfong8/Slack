import React from 'react';
import { transitions, positions, Provider as AlertProvider, useAlert } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';
import Sidebar from './sidebar/sidebar';
import MessagesContainer from './messages/messages_container';
import { Details } from './right_sidebar/details';
import { Switch, Route } from 'react-router-dom';
import UserPage from './right_sidebar/user_page';

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className="alert-template">
    {options.type === 'info' && (
      <img
        className="img-alert"
        src="https://res.cloudinary.com/ryancfong8/image/upload/v1591162347/profile_mxbbxt.png"
      />
    )}
    {message}
    <button className="close-btn" onClick={close}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 'margin-right': 0, 'min-width': '24px' }}
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
);

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 768,
      showMobile: false,
      showComponent: 'messages', // messages, sidebar, right-sidebar
    };

    this.workSpaceRef = React.createRef();
  }

  componentDidMount() {
    let showComponent = 'messages';
    if (location.pathname.indexOf('details') >= 0 || location.pathname.indexOf('users') >= 0) {
      showComponent = 'right-sidebar';
    }
    const width = this.workSpaceRef.current.offsetWidth;
    const showMobile = width < 576;
    this.setState({ width, showMobile, showComponent });
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const { location, match } = this.props;
    const { showComponent } = this.state;
    // for navigating directly to a new channel in mobile
    if (
      prevProps.match &&
      prevProps.match.params.channelId &&
      match &&
      match.params.channelId &&
      prevProps.match.params.channelId !== match.params.channelId
    ) {
      if (showComponent !== 'messages') {
        this.setState({ showComponent: 'messages' });
      }
    }
    // for updating right sidebar view in mobile
    if (location.pathname.indexOf('details') >= 0 || location.pathname.indexOf('users') >= 0) {
      if (showComponent !== 'right-sidebar') {
        this.setState({ showComponent: 'right-sidebar' });
      }
    } else {
      if (showComponent === 'right-sidebar') {
        this.setState({ showComponent: 'messages' });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const width = window.innerWidth;
    const showMobile = width < 576;
    this.setState({ width, showMobile });
  };

  toggleMobileSidebar = (show) => {
    if (show) {
      this.setState({ showComponent: 'sidebar' });
    } else {
      this.setState({ showComponent: 'messages' });
    }
  };

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
    const { width, showMobile, showComponent } = this.state;
    const options = {
      position: 'top right',
      timeout: 10000,
      offset: '10px',
      transition: transitions.SCALE,
      containerStyle: {
        fontSize: '15px',
      },
    };
    return (
      <AlertProvider template={AlertTemplate} {...options}>
        <div className={`main-content-container ${showMobile && 'mobile'}`} ref={this.workSpaceRef}>
          {/* <h1>Welcome to your workspace</h1>
        <button className="header-button" onClick={logout}>
        Log Out
      </button> */}
          <Sidebar
            className={`${showMobile ? (showComponent === 'sidebar' ? '' : 'd-none') : ''}`}
            currentChannel={currentChannel}
            history={history}
            match={match}
            receiveHighlightedMessage={receiveHighlightedMessage}
            toggleMobileSidebar={this.toggleMobileSidebar}
            width={width}
          />
          <MessagesContainer
            className={`${showMobile ? (showComponent === 'messages' ? '' : 'd-none') : ''}`}
            currentChannel={currentChannel}
            match={match}
            history={history}
            location={location}
            toggleMobileSidebar={this.toggleMobileSidebar}
            toggleMobileRightSidebar={this.toggleMobileRightSidebar}
            showMobile={showMobile}
            width={width}
          />
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
                  className={`${showMobile ? (showComponent === 'right-sidebar' ? '' : 'd-none') : ''}`}
                  showMobile={showMobile}
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
                  className={`${showMobile ? (showComponent === 'right-sidebar' ? '' : 'd-none') : ''}`}
                  showMobile={showMobile}
                />
              )}
            />
          </Switch>
        </div>
      </AlertProvider>
    );
  }
}

export default Workspace;
