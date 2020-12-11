import React from 'react';
import { Link } from 'react-router-dom';
import { getChannelName } from '../../../util/utils';

const ChannelListItem = (props) => {
  const { channel, currentUserId, currentChannel, toggleMobileSidebar } = props;
  if (!channel) return null;
  const icon = channel.channel_private ? <i className="fas fa-lock mr-1"></i> : <i className="fas fa-hashtag mr-1"></i>;
  const channelName = getChannelName(channel, currentUserId);
  return (
    <Link
      to={`/messages/${channel.id}`}
      onClick={() => {
        toggleMobileSidebar(false);
      }}
    >
      <div
        className={`channel-list-link d-flex flex-row align-items-center justify-content-between w-100 ${
          currentChannel && channel.id === currentChannel.id ? 'active' : ''
        }`}
      >
        <div>
          {channel.channel_type === 'channel' ? (
            icon
          ) : (
            <>
              <span className="green mr-1">•</span>
            </>
          )}
          {channelName}
        </div>
        {channel.notifications && channel.notifications.length > 0 && (
          <div className="red-notification">{channel.notifications.length}</div>
        )}
      </div>
    </Link>
  );
};

export default ChannelListItem;
