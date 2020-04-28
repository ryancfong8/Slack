import React from 'react';
import moment from 'moment';

class MessagesListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, showUserInfo } = this.props;
    if (!showUserInfo) {
      return (
        <div className="messages-list-component no-avatar">
          <div dangerouslySetInnerHTML={{ __html: message.body }} />
        </div>
      );
    }
    return (
      <div className="messages-list-component d-flex flex-row">
        <img className="message-avatar" src={message.user.avatar_url} />
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-end mb-1">
            <span className="mr-2 username">{message.user.username}</span>
            <div className="time">{moment(message.created_at).format('LT')}</div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: message.body }} />
        </div>
      </div>
    );
  }
}

export default MessagesListComponent;
