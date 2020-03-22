import React from 'react';

class MessagesPageHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { channel } = this.props;
    return (
      <div className="messages-page-header">
        <h6 className="title">{channel.channel_type === 'channel' ? `#${channel.title}` : channel.title}</h6>
        <div className="members d-flex flex-row align-items-center">
          <i id="user-icon" className="fa fa-user-o mr-1" aria-hidden="true"></i>
          {channel.members.length}
        </div>
      </div>
    );
  }
}

export default MessagesPageHeader;
