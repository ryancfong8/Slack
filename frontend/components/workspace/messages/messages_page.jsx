import React from 'react';
import MessagesPageHeader from './messages_page_header';

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
    const { currentChannel } = this.props;
    if (!currentChannel.id) return <div className="messages-page">Select a Channel</div>;
    return (
      <div className="messages-page">
        <MessagesPageHeader channel={currentChannel} />
        {/* <MessagesList />
                <MessagesInputContainer /> */}
      </div>
    );
  }
}

export default MessagesPage;
