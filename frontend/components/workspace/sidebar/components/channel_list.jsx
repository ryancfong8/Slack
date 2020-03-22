import React from 'react';
import { Link } from 'react-router-dom';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getChannels, channelType, currentUserId } = this.props;
    getChannels(currentUserId);
  }

  componentDidUpdate(prevProps) {
    const { getChannels, channelType, currentUserId } = this.props;
    if (channelType !== prevProps.channelType || currentUserId !== prevProps.currentUserId) {
      getChannels(currentUserId);
    }
  }

  render() {
    const { channels, channelType, currentChannel } = this.props;
    return (
      <div className="channel-list">
        <div className="heading">{channelType === 'channel' ? 'Channels' : 'Direct Messages'}</div>
        {channels.map((channel, index) => {
          if (channel) {
            return (
              <Link to={`/messages/${channel.id}`} key={index}>
                <div
                  className={`channel-list-link ${currentChannel && channel.id === currentChannel.id ? 'active' : ''}`}
                >
                  {channel && channel.title ? (channelType === 'channel' ? `# ${channel.title}` : channel.title) : ''}
                </div>
              </Link>
            );
          }
        })}
      </div>
    );
  }
}

export default ChannelList;
