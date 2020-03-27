import React from 'react';
import MessagesEditor from './messages_editor';

class MessagesInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { createMessage, currentUser, currentChannel } = this.props;
    return (
      <div className="messages-input-outer">
        <MessagesEditor createMessage={createMessage} currentUser={currentUser} currentChannel={currentChannel} />
      </div>
    );
  }
}

export default MessagesInput;
