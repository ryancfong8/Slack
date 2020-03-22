import { RECEIVE__MESSAGES, RECEIVE__MESSAGE } from '../actions/message_actions.js';
import merge from 'lodash/merge';

const MessageReducer = (oldState = { messages: [] }, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__MESSAGES:
      return merge({}, oldState, { messages: action.messages});
    case RECEIVE__MESSAGE:
      return merge({}, oldState, { messages: messages.concat([action.message]) });
    default:
      return oldState;
  }
};

export default MessageReducer;
