import React from 'react';
import MessagesListComponent from './messages_list_component';
import moment from 'moment';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messagesListHeight: 0,
    };

    this.scrollToElement = this.scrollToElement.bind(this);
  }

  scrollToElement() {
    const { removeHighlightedMessage } = this.props;
    if (this.messageHighlight) {
      this.messageHighlight.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
      delete this.messageHighlight;
      setTimeout(() => removeHighlightedMessage(), 3000);
    } else {
      this.messagesEnd.scrollIntoView();
    }
  }

  componentDidMount() {
    this.scrollToElement();
    const height = document.getElementById('MessagesList').clientHeight;
    this.setState({ messagesListHeight: height });
  }

  componentDidUpdate(prevProps, prevState) {
    // const messagesTotal = (this.props.messages && this.props.messages.length) || 0;
    // if (messagesTotal && messagesTotal > this.state.messagesTotal) {
    //   this.scrollToElement();
    // }
    // this.state.messagesTotal = messagesTotal;
    const { messageHighlight, messages } = this.props;
    if (prevProps.messages.length !== messages.length || (messageHighlight && !prevProps.messageHighlight)) {
      this.scrollToElement();
    }
    const height = document.getElementById('MessagesList').clientHeight;
    if (prevState.messagesListHeight !== height) {
      this.setState({ messagesListHeight: height });
    }
  }

  render() {
    const {
      messages,
      createMessage,
      currentChannel,
      currentUser,
      updateMessage,
      deleteMessage,
      createReaction,
      deleteReaction,
      messageHighlight,
    } = this.props;
    const { messagesListHeight } = this.state;
    return (
      <div className="messages-list" id="MessagesList">
        {messages.map((message, index) => {
          if (message && message.message_type === 'time') {
            return (
              <div key={message.created_at} className={`date ${index === 0 && 'first-date'}`}>
                <div className="date-txt">{moment(message.created_at).format('dddd MMMM Do')}</div>
                {/* <hr /> */}
              </div>
            );
          }
          if (message) {
            const prevMessage = messages[index - 1];
            const showUserInfo = prevMessage && prevMessage.user_id === message.user_id ? false : true;
            if (messageHighlight == message.id) {
              return (
                <MessagesListComponent
                  message={message}
                  key={message.id}
                  showUserInfo={showUserInfo}
                  createMessage={createMessage}
                  updateMessage={updateMessage}
                  deleteMessage={deleteMessage}
                  currentChannel={currentChannel}
                  currentUser={currentUser}
                  messagesListHeight={messagesListHeight}
                  createReaction={createReaction}
                  deleteReaction={deleteReaction}
                  refMessage={(el) => {
                    this.messageHighlight = el;
                  }}
                  messageClassName="message-highlight"
                />
              );
            }
            return (
              <MessagesListComponent
                message={message}
                key={message.id}
                showUserInfo={showUserInfo}
                createMessage={createMessage}
                updateMessage={updateMessage}
                deleteMessage={deleteMessage}
                currentChannel={currentChannel}
                currentUser={currentUser}
                messagesListHeight={messagesListHeight}
                createReaction={createReaction}
                deleteReaction={deleteReaction}
              />
            );
          }
        })}
        <div
          id="invisible-div"
          style={{ float: 'left', clear: 'both' }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default MessagesList;
