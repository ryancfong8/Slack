import {
  RECEIVE__CHANNELS,
  RECEIVE__DIRECT_CHANNELS,
  RECEIVE__CHANNEL,
  RECEIVE__NEW_CHANNEL
} from '../actions/channel_actions.js';
import merge from 'lodash/merge';

const ChannelsReducer = (oldState = { channels: [], direct_channels: [], currentChannel: {} }, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__CHANNELS:
      return merge({}, oldState, { channels: action.channels });
    case RECEIVE__DIRECT_CHANNELS:
      return merge({}, oldState, { direct_channels: action.direct_channels });
    case RECEIVE__NEW_CHANNEL:
      const newChannels = oldState.channels.concat([action.channel]);
      newChannels.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
      return merge({}, oldState, { channels: newChannels, currentChannel: action.channel });
    case RECEIVE__CHANNEL:
      return merge({}, oldState, { currentChannel: action.channel });
    default:
      return oldState;
  }
};

export default ChannelsReducer;
