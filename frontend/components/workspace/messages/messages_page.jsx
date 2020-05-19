import React from 'react';
import { withAlert } from 'react-alert';
import MessagesPageHeader from './messages_page_header';
import MessagesList from './messages_list';
import MessagesInput from './messages_input';

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getMessages, match, getCurrentChannel, history, alert } = this.props;
    getMessages(match.params.channelId).catch((err) => {
      if (err.status == 401) {
        alert.show('You do not have permission to view that channel');
        history.push(`/messages/1`);
      }
    });
    getCurrentChannel(match.params.channelId);
  }

  componentDidUpdate(prevProps) {
    const { getMessages, match, currentChannel, getCurrentChannel, history, alert } = this.props;
    if (
      match.params.channelId !== prevProps.match.params.channelId ||
      currentChannel.id !== prevProps.currentChannel.id
    ) {
      getMessages(match.params.channelId).catch((err) => {
        if (err.status == 401) {
          alert.show('You do not have permission to view that channel');
          history.push(`/messages/1`);
        }
      });
      getCurrentChannel(match.params.channelId);
    }
  }

  render() {
    const {
      currentChannel,
      messages,
      createMessage,
      currentUser,
      history,
      updateMessage,
      deleteMessage,
      createReaction,
      deleteReaction,
      location,
      messageHighlight,
      receiveHighlightedMessage,
      removeHighlightedMessage,
      className,
      showMobile,
      toggleMobileSidebar,
      width,
    } = this.props;
    if (!currentChannel.id) return <div className="messages-page">Select a Channel</div>;
    return (
      <div className={`messages-page ${className}`}>
        <MessagesPageHeader
          channel={currentChannel}
          currentUser={currentUser}
          history={history}
          location={location}
          receiveHighlightedMessage={receiveHighlightedMessage}
          showMobile={showMobile}
          toggleMobileSidebar={toggleMobileSidebar}
          width={width}
        />
        <MessagesList
          messages={messages}
          updateMessage={updateMessage}
          deleteMessage={deleteMessage}
          createReaction={createReaction}
          deleteReaction={deleteReaction}
          currentChannel={currentChannel}
          currentUser={currentUser}
          messageHighlight={messageHighlight}
          removeHighlightedMessage={removeHighlightedMessage}
        />
        <MessagesInput createMessage={createMessage} currentChannel={currentChannel} currentUser={currentUser} />
      </div>
    );
  }
}

export default withAlert()(MessagesPage);
