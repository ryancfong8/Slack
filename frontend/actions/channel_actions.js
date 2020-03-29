import * as ChannelAPIUtil from '../util/channel_api_util.js';

export const RECEIVE__CHANNELS = 'GET__CHANNELS';
export const RECEIVE__DIRECT_CHANNELS = 'RECEIVE__DIRECT_CHANNELS';
export const RECEIVE__CHANNEL = 'RECEIVE__CHANNEL';
export const RECEIVE__NEW_CHANNEL = 'RECEIVE__NEW_CHANNEL';

const receiveChannels = channels => ({
  type: RECEIVE__CHANNELS,
  channels
});

const receiveDirectChannels = direct_channels => ({
  type: RECEIVE__DIRECT_CHANNELS,
  direct_channels
});

const receiveChannel = channel => ({
  type: RECEIVE__CHANNEL,
  channel
});

const receiveNewChannel = channel => ({
  type: RECEIVE__NEW_CHANNEL,
  channel
});

export const getChannels = id => dispatch => {
  return ChannelAPIUtil.getChannels('channel', id).then(channels => {
    dispatch(receiveChannels(channels));
  });
};

export const getDirectChannels = id => dispatch => {
  return ChannelAPIUtil.getChannels('direct', id).then(channels => dispatch(receiveDirectChannels(channels)));
};

export const createChannel = channel => dispatch => {
  return ChannelAPIUtil.createChannel(channel).then(channel => dispatch(receiveNewChannel(channel)));
};

export const getCurrentChannel = id => dispatch => {
  return ChannelAPIUtil.getCurrentChannel(id).then(channel => dispatch(receiveChannel(channel)));
};
