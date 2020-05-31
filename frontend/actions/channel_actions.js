import * as ChannelAPIUtil from '../util/channel_api_util.js';

export const RECEIVE__CHANNELS = 'GET__CHANNELS';
export const RECEIVE__DIRECT_CHANNELS = 'RECEIVE__DIRECT_CHANNELS';
export const RECEIVE__CHANNEL = 'RECEIVE__CHANNEL';
export const RECEIVE__NEW_CHANNEL = 'RECEIVE__NEW_CHANNEL';
export const RECEIVE__UPDATED_CHANNEL = 'RECEIVE__UPDATED_CHANNEL';

const receiveChannels = (channels) => ({
  type: RECEIVE__CHANNELS,
  channels,
});

const receiveDirectChannels = (direct_channels) => ({
  type: RECEIVE__DIRECT_CHANNELS,
  direct_channels,
});

const receiveChannel = (channel) => ({
  type: RECEIVE__CHANNEL,
  channel,
});

const receiveNewChannel = (channel) => ({
  type: RECEIVE__NEW_CHANNEL,
  channel,
});

const receiveUpdatedChannel = (channel) => ({
  type: RECEIVE__UPDATED_CHANNEL,
  channel,
});

export const getChannels = () => (dispatch) => {
  const data = {
    channel_type: 'channel',
    is_member: true,
    channel_private: true,
  };
  return ChannelAPIUtil.searchChannels(data).then((channels) => {
    return dispatch(receiveChannels(channels));
  });
};

export const getDirectChannels = (id) => (dispatch) => {
  const data = {
    channel_type: 'direct',
    is_member: true,
    channel_private: true,
  };
  return ChannelAPIUtil.searchChannels(data).then((channels) => dispatch(receiveDirectChannels(channels)));
};

export const createChannel = (channel, member_ids) => (dispatch) => {
  return ChannelAPIUtil.createChannel(channel, member_ids).then((channel) => dispatch(receiveNewChannel(channel)));
};

export const getCurrentChannel = (id) => (dispatch) => {
  return ChannelAPIUtil.getCurrentChannel(id).then((channel) => dispatch(receiveChannel(channel)));
};

export const updateChannel = (channel, member_ids) => (dispatch) => {
  return ChannelAPIUtil.updateChannel(channel, member_ids).then((channel) => dispatch(receiveUpdatedChannel(channel)));
};

export const joinChannel = (membership) => (dispatch) => {
  return ChannelAPIUtil.joinChannel(membership).then((channel) => dispatch(receiveNewChannel(channel)));
};
