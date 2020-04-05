import {
  RECEIVE__CHANNELS,
  RECEIVE__DIRECT_CHANNELS,
  RECEIVE__CHANNEL,
  RECEIVE__NEW_CHANNEL,
  RECEIVE__UPDATED_CHANNEL
} from '../actions/channel_actions.js';
import merge from 'lodash/merge';
import { getChannelName } from '../components/util/utils.jsx';

const channelSortFunc = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());
const directChannelSortFunc = (a, b) =>
  getChannelName(a)
    .toLowerCase()
    .localeCompare(getChannelName(b).toLowerCase());

const ChannelsReducer = (oldState = { channels: [], direct_channels: [], currentChannel: {} }, action) => {
  Object.freeze(oldState);
  let newChannels;
  let oldIndex;
  switch (action.type) {
    case RECEIVE__CHANNELS:
      newChannels = Object.values(action.channels);
      newChannels.sort(channelSortFunc);
      return merge({}, oldState, { channels: newChannels });
    case RECEIVE__DIRECT_CHANNELS:
      newChannels = Object.values(action.direct_channels);
      newChannels.sort(directChannelSortFunc);
      return merge({}, oldState, { direct_channels: newChannels });
    case RECEIVE__NEW_CHANNEL:
      if (action.channel.channel_type === 'channel') {
        newChannels = oldState.channels.concat([action.channel]);
        newChannels.sort(channelSortFunc);
        return { channels: newChannels, direct_channels: oldState.direct_channels, currentChannel: action.channel };
      } else {
        newChannels = oldState.direct_channels.concat([action.channel]);
        newChannels.sort(directChannelSortFunc);
        return { channels: oldState.channels, direct_channels: newChannels, currentChannel: action.channel };
      }
    case RECEIVE__UPDATED_CHANNEL:
      if (action.channel.channel_type === 'channel') {
        oldIndex = oldState.channels.map(channel => channel.id).indexOf(action.channel.id);
        newChannels = oldState.channels.slice(0);
        newChannels.splice(oldIndex, 1, action.channel);
        newChannels.sort(channelSortFunc);
        return { channels: newChannels, direct_channels: oldState.direct_channels, currentChannel: action.channel };
      } else {
        oldIndex = oldState.direct_channels.map(channel => channel.id).indexOf(action.channel.id);
        newChannels = oldState.direct_channels.slice(0);
        newChannels.splice(oldIndex, 1, action.channel);
        newChannels.sort(directChannelSortFunc);
        return { channels: oldState.channels, direct_channels: newChannels, currentChannel: action.channel };
      }
    case RECEIVE__CHANNEL:
      return merge({}, oldState, { currentChannel: action.channel });
    default:
      return oldState;
  }
};

export default ChannelsReducer;
