import { RECEIVE__HIGHLIGHT_MESSAGE, REMOVE__HIGHLIGHT_MESSAGE } from '../actions/message_actions.js';

const MessageHighlightReducer = (oldState = null, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__HIGHLIGHT_MESSAGE:
      return action.id;
    case REMOVE__HIGHLIGHT_MESSAGE:
      return null;
    default:
      return oldState;
  }
};

export default MessageHighlightReducer;
