import React, { useState } from 'react';
import { getChannelName } from '../../util/utils';
import AddMembers from '../right_sidebar/add_members';

export const Details = (props) => {
  const { channel, currentUserId, match, history, updateChannel, className } = props;
  if (!channel || !channel.members) return <h1>Loading...</h1>;
  const modifier = match.params.modifier;
  const [openAddMembers, setOpenAddMembers] = useState(false);

  const icon = channel.channel_private ? <i className="fas fa-lock mr-1"></i> : <i className="fas fa-hashtag mr-1"></i>;

  return (
    <div className={`right-sidebar ${className}`}>
      <div className="title d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-column">
          <h6>Details</h6>
          <span className="subtitle">
            {channel.channel_type === 'channel' ? icon : <span className="green mr-1">•</span>}
            {getChannelName(channel, currentUserId)}
          </span>
        </div>
        <div
          className="close"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/messages/${channel.id}`);
          }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
      <div className="action-buttons">
        <div className="d-flex flex-column align-items-center">
          <div
            className="add-user-btn"
            onClick={(e) => {
              e.preventDefault();
              setOpenAddMembers(true);
            }}
          >
            <i className="fas fa-user-plus"></i>
          </div>
          <span className="subtitle">Add</span>
        </div>
      </div>
      <div className={`tab ${modifier === 'about' ? 'active' : ''}`}>
        <div
          className="title-tab d-flex flex-row justify-content-between align-items-center p-3"
          onClick={(e) => {
            e.preventDefault();
            const mod = modifier === 'about' ? '' : 'about';
            history.push(`/messages/${channel.id}/details/${mod}`);
          }}
        >
          <h6>About</h6>
          {modifier === 'about' ? (
            <i className="fas fa-angle-down fa-lg"></i>
          ) : (
            <i className="fas fa-angle-right fa-lg"></i>
          )}
        </div>
        {modifier === 'about' && (
          <div className="pr-3 pl-3">{channel.description || <span className="subtitle">No Description</span>}</div>
        )}
      </div>
      <div className={`tab ${modifier === 'members' ? 'active' : ''}`}>
        <div
          className="title-tab d-flex flex-row justify-content-between align-items-center p-3"
          onClick={(e) => {
            e.preventDefault();
            const mod = modifier === 'members' ? '' : 'members';
            history.push(`/messages/${channel.id}/details/${mod}`);
          }}
        >
          <h6>Members</h6>
          <div className="d-flex flex-row align-items-center">
            <div className="subtitle mr-3">{channel.members.length}</div>
            {modifier === 'members' ? (
              <i className="fas fa-angle-down fa-lg"></i>
            ) : (
              <i className="fas fa-angle-right fa-lg"></i>
            )}
          </div>
        </div>
        {modifier === 'members' && (
          <>
            {channel.members.map((member, index) => (
              <UserItem
                user={member}
                currentUserId={currentUserId}
                key={`${member.id}${index}${member.created_at}`}
                className="channel-browse-item"
                channel={channel}
                history={history}
              />
            ))}
          </>
        )}
      </div>
      {openAddMembers && (
        <AddMembers
          setOpenAddMembers={setOpenAddMembers}
          channel={channel}
          currentUserId={currentUserId}
          history={history}
          updateChannel={updateChannel}
        />
      )}
    </div>
  );
};

export const UserItem = (props) => {
  const { user, currentUserId, className, channel, history } = props;
  const goToUser = () => {
    history.push(`/messages/${channel.id}/users/${user.id}`);
  };
  return (
    <div className={`d-flex flex-row align-items-center ${className}`} onClick={(e) => goToUser()}>
      <img className="member-avatar" src={user.avatar_url} />
      <h6 className="list-item-name mb-0 mr-2">
        {user.username} {user.id === currentUserId && <span className="subtitle">(you)</span>}
      </h6>
      <span className="green">•</span>
      <span className="ml-2">{user.name}</span>
    </div>
  );
};
