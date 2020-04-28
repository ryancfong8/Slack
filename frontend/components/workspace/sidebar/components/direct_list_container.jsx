import React from 'react';
import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { createChannel, getDirectChannels, getCurrentChannel } from '../../../../actions/channel_actions';
import { receiveMessage } from '../../../../actions/message_actions';

const mapStateToProps = state => ({
  channels: state.channels.direct_channels,
  channelType: 'direct',
  currentUserId: state.session.currentUser && state.session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  createChannel: (channel, member_ids) => dispatch(createChannel(channel, member_ids)),
  getChannels: () => dispatch(getDirectChannels()),
  getCurrentChannel: id => dispatch(getCurrentChannel(id)),
  receiveMessage: message => dispatch(receiveMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
