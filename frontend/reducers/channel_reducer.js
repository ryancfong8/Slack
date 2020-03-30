import {
  RECEIVE__CHANNELS,
  RECEIVE__DIRECT_CHANNELS,
  RECEIVE__CHANNEL,
  RECEIVE__NEW_CHANNEL
} from '../actions/channel_actions.js';
import merge from 'lodash/merge';

function channelSortFunc(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

const ChannelsReducer = (oldState = { channels: [], direct_channels: [], currentChannel: {} }, action) => {
  Object.freeze(oldState);
  let newChannels;
  switch (action.type) {
    case RECEIVE__CHANNELS:
      newChannels = Object.values(action.channels);
      newChannels.sort(channelSortFunc);
      return merge({}, oldState, { channels: newChannels });
    case RECEIVE__DIRECT_CHANNELS:
      newChannels = Object.values(action.direct_channels);
      newChannels.sort(channelSortFunc);
      return merge({}, oldState, { direct_channels: newChannels });
    case RECEIVE__NEW_CHANNEL:
      newChannels = oldState.channels.concat([action.channel]);
      newChannels.sort(channelSortFunc);
      return { channels: newChannels, direct_channels: oldState.direct_channels, currentChannel: action.channel };
    case RECEIVE__CHANNEL:
      return merge({}, oldState, { currentChannel: action.channel });
    default:
      return oldState;
  }
};

export default ChannelsReducer;
