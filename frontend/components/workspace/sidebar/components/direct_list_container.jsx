import React from 'react';
import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { createChannel, getDirectChannels, getCurrentChannel } from '../../../../actions/channel_actions';

const mapStateToProps = state => ({
  channels: state.channels.direct_channels,
  channelType: 'direct',
  currentUserId: state.session.currentUser && state.session.currentUser.id
});

const mapDispatchToProps = dispatch => ({
  createChannel: data => dispatch(createChannel(data)),
  getChannels: (channelType, id) => dispatch(getDirectChannels(channelType, id)),
  getCurrentChannel: id => dispatch(getCurrentChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
