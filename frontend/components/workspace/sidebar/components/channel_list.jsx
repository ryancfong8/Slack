import React from 'react';

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
    const { channels, channelType, currentUserId } = this.props;
    console.log('USER ID', currentUserId);
    console.log('CHANNELS === ', channels);
    return (
      <div className="channel-list">
        <div className="heading">{channelType === 'channel' ? 'Channels' : 'Direct Messages'}</div>
        {channels.map((channel, index) => (
          <div key={index}>
            <a href="#">
              {channel && channel.title ? (channelType === 'channel' ? `# ${channel.title}` : channel.title) : ''}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default ChannelList;
