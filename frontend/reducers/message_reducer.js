import { RECEIVE__MESSAGES, RECEIVE__MESSAGE } from '../actions/message_actions.js';
// import merge from 'lodash/merge';

const MessageReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE__MESSAGES:
      return addDates(action.messages);
    case RECEIVE__MESSAGE:
      return addOneDate(oldState.concat([action.message]));
    default:
      return oldState;
  }
};

export default MessageReducer;

const addDates = function (messages) {
  const newMessages = [];
  messages.forEach((message, i) => {
    if (i === 0) {
      newMessages.push({ message_type: 'time', created_at: message.created_at });
      newMessages.push(message);
    } else {
      if (
        new Date(message.created_at).getTime() >
        new Date(newMessages[newMessages.length - 1].created_at).getTime() + 1000 * 60 * 60 * 24
      ) {
        newMessages.push({ message_type: 'time', created_at: message.created_at });
        newMessages.push(message);
      } else {
        newMessages.push(message);
      }
    }
  });
  return newMessages;
};

const addOneDate = function (messages) {
  if (
    new Date(messages[messages.length - 1]).getTime() >
    new Date(messages[messages.length - 2].created_at).getTime() + 1000 * 60 * 60 * 24
  ) {
    let newMessages = messages.slice(0);
    newMessages.splice(messages.length - 2, 0, {
      message_type: 'time',
      created_at: messages[messages.length - 1].created_at,
    });
    return newMessages;
  }
  return messages;
};
