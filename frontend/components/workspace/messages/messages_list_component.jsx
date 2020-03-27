import React from 'react';
import moment from 'moment';

class MessagesListComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, showUserInfo } = this.props;
    return (
      <div className="messages-list-component">
        {showUserInfo && (
          <div className="d-flex flex-row align-items-end mb-1">
            <span className="mr-2 username">{message.user.username}</span>
            <div className="time">{moment(message.created_at).format('LT')}</div>
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: message.body }} />
      </div>
    );
  }
}

export default MessagesListComponent;
