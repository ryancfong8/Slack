import React from 'react';
import { connect } from 'react-redux';
import ChannelList from './channel_list';
import { createChannel, getChannels } from '../../../../actions/channel_actions';

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    channelType: 'channel',
    currentUserId: state.session.currentUser && state.session.currentUser.id
  };
};

const mapDispatchToProps = dispatch => ({
  createChannel: () => dispatch(createChannel),
  getChannels: (channelType, id) => dispatch(getChannels(channelType, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
