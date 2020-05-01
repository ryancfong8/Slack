import React from 'react';
import MessagesPageHeader from './messages_page_header';
import MessagesList from './messages_list';
import MessagesInput from './messages_input';

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getMessages, match, getCurrentChannel } = this.props;
    getMessages(match.params.channelId);
    getCurrentChannel(match.params.channelId);
  }

  componentDidUpdate(prevProps) {
    const { getMessages, match, currentChannel, getCurrentChannel } = this.props;
    if (
      match.params.channelId !== prevProps.match.params.channelId ||
      currentChannel.id !== prevProps.currentChannel.id
    ) {
      getMessages(match.params.channelId);
      getCurrentChannel(match.params.channelId);
    }
  }

  render() {
    const { currentChannel, messages, createMessage, currentUser, history, updateMessage, deleteMessage } = this.props;
    if (!currentChannel.id) return <div className="messages-page">Select a Channel</div>;
    return (
      <div className="messages-page">
        <MessagesPageHeader channel={currentChannel} currentUser={currentUser} history={history} />
        <MessagesList
          messages={messages}
          updateMessage={updateMessage}
          deleteMessage={deleteMessage}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
        <MessagesInput createMessage={createMessage} currentChannel={currentChannel} currentUser={currentUser} />
      </div>
    );
  }
}

export default MessagesPage;
