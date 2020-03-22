import React from 'react';
import MessagesListComponent from './messages_list_component';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        {messages.map((message, index) => {
          if (message) {
            const prevMessage = messages[index - 1];
            const showUserInfo = prevMessage && prevMessage.user_id === message.user_id ? false : true;
            return <MessagesListComponent message={message} key={message.id} showUserInfo={showUserInfo} />;
          }
        })}
      </div>
    );
  }
}

export default MessagesList;
