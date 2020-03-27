import React from 'react';
import MessagesListComponent from './messages_list_component';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToElement = this.scrollToElement.bind(this);
  }

  scrollToElement() {
    // if (this.messageFetched) {
    //   this.messageFetched.scrollIntoView();
    //   delete this.messageFetched;
    //   this.state.skipQueryTest = true;
    // } else {
    this.messagesEnd.scrollIntoView();
    // }
  }

  componentDidMount() {
    this.scrollToElement();
  }

  componentDidUpdate() {
    // const messagesTotal = (this.props.messages && this.props.messages.length) || 0;
    // if (messagesTotal && messagesTotal > this.state.messagesTotal) {
    //   this.scrollToElement();
    // }
    // this.state.messagesTotal = messagesTotal;
    this.scrollToElement();
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="messages-list">
        {messages.map((message, index) => {
          if (message) {
            const prevMessage = messages[index - 1];
            const showUserInfo = prevMessage && prevMessage.user_id === message.user_id ? false : true;
            return <MessagesListComponent message={message} key={message.id} showUserInfo={showUserInfo} />;
          }
        })}
        <div
          id="invisible-div"
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </div>
    );
  }
}

export default MessagesList;
