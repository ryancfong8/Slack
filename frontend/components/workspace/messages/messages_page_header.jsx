import React, { useState, useEffect } from 'react';
import { getChannelName } from '../../util/utils';
import { Link } from 'react-router-dom';
import MessagesSearch from './messages_search';

const MessagesPageHeader = (props) => {
  const { channel, currentUser, history, location, receiveHighlightedMessage } = props;
  const channelName = getChannelName(channel, currentUser.id);
  const icon =
    channel.channel_type === 'direct' ? (
      <span className="green mr-1">•</span>
    ) : channel.channel_private ? (
      <i className="fas fa-lock mr-1"></i>
    ) : (
      <i className="fas fa-hashtag mr-1"></i>
    );
  const [showDetail, setShowDetail] = useState(location.pathname.indexOf('details') >= 0);
  useEffect(() => {
    setShowDetail(location.pathname.indexOf('details') >= 0);
  }, [location.pathname]);
  const detailLink = `/messages/${channel.id}${!showDetail ? '/details' : ''}`;
  return (
    <div className="messages-page-header d-flex flex-row justify-content-between align-items-center">
      <div className="d-flex flex-column">
        <h6 className="name">
          {icon}
          {channelName}
        </h6>
        <div className="members d-flex flex-row align-items-center">
          <div
            className="user-icon"
            onClick={(e) => {
              e.preventDefault();
              history.push(`/messages/${channel.id}/details/members`);
            }}
          >
            <i className="fa fa-user-o mr-1" aria-hidden="true"></i>
            {channel.members.length}
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center">
        <MessagesSearch
          currentUser={currentUser}
          currentChannel={channel}
          history={history}
          receiveHighlightedMessage={receiveHighlightedMessage}
        />
        <Link className="detail-button d-flex flex-row align-items-center" to={detailLink}>
          <i className="fas fa-info-circle mr-1"></i>
          {!showDetail && <span>Details</span>}
        </Link>
      </div>
    </div>
  );
};

export default MessagesPageHeader;
