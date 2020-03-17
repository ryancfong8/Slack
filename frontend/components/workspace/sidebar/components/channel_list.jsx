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
      <div>
        <h4>{channelType === 'channel' ? 'CHANNELS' : 'DIRECT MESSAGES'}</h4>
        {channels.map((channel, index) => (
          <div key={index}>
            <a href="#">{channel && channel.title}</a>
          </div>
        ))}
      </div>
    );
  }
}

export default ChannelList;
