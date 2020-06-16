import React from 'react';
import { withAlert } from 'react-alert';
import MessagesPageHeader from './messages_page_header';
import MessagesList from './messages_list';
import MessagesInput from './messages_input';
import { receiveLoadingState } from '../../../actions/loading_actions';
import { LoadingPage } from '../../util/loading_page';

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getMessages, match, getCurrentChannel, history, alert, receiveLoadingState } = this.props;
    receiveLoadingState(true);
    getCurrentChannel(match.params.channelId);
    getMessages(match.params.channelId).catch((err) => {
      if (err.status == 401) {
        alert.show('You do not have permission to view that channel');
        history.push(`/messages/1`);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { getMessages, match, getCurrentChannel, history, alert } = this.props;
    if (match.params.channelId !== prevProps.match.params.channelId) {
      receiveLoadingState(true);
      getCurrentChannel(match.params.channelId);
      getMessages(match.params.channelId).catch((err) => {
        if (err.status == 401) {
          alert.show('You do not have permission to view that channel');
          history.push(`/messages/1`);
        }
      });
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
      loading,
    } = this.props;

    if (loading || !currentChannel || !currentChannel.id) {
      return <LoadingPage />;
    }
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
          width={width}
        />
        <MessagesInput createMessage={createMessage} currentChannel={currentChannel} currentUser={currentUser} />
      </div>
    );
  }
}

export default withAlert()(MessagesPage);
