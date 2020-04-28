import React from 'react';
import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { createChannel, getChannels, getCurrentChannel } from '../../../../actions/channel_actions';
import { receiveMessage } from '../../../../actions/message_actions';
import { getUsers } from '../../../../actions/users_actions';

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    channelType: 'channel',
    currentUserId: state.session.currentUser && state.session.currentUser.id,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => ({
  createChannel: (channel, member_ids) => dispatch(createChannel(channel, member_ids)),
  getChannels: () => dispatch(getChannels()),
  getCurrentChannel: id => dispatch(getCurrentChannel(id)),
  getUsers: () => dispatch(getUsers()),
  receiveMessage: message => dispatch(receiveMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
