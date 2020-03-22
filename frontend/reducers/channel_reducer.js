import { RECEIVE__CHANNELS, RECEIVE__DIRECT_CHANNELS, RECEIVE__CHANNEL } from '../actions/channel_actions.js';
import merge from 'lodash/merge';

const ChannelsReducer = (oldState = { channels: [], direct_channels: [], currentChannel: {} }, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__CHANNELS:
      return merge({}, oldState, { channels: action.channels });
    case RECEIVE__DIRECT_CHANNELS:
      return merge({}, oldState, { direct_channels: action.direct_channels });
    case RECEIVE__CHANNEL:
      return merge({}, oldState, { currentChannel: action.channel });
    default:
      return oldState;
  }
};

export default ChannelsReducer;
