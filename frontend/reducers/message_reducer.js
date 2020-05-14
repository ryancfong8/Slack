import {
  RECEIVE__MESSAGES,
  RECEIVE__MESSAGE,
  RECEIVE__UPDATED_MESSAGE,
  RECEIVE__DELETED_MESSAGE,
} from '../actions/message_actions.js';
// import merge from 'lodash/merge';

const MessageReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState = [...oldState];
  let idx;
  switch (action.type) {
    case RECEIVE__MESSAGES:
      return addDates(action.messages);
    case RECEIVE__MESSAGE:
      const updatedMessageIdx = newState.map((message) => message.id).indexOf(action.message.id);
      if (updatedMessageIdx !== -1) {
        newState.splice(updatedMessageIdx, 1, action.message);
        return newState;
      }
      return addOneDate(oldState.concat([action.message]));
    case RECEIVE__UPDATED_MESSAGE:
      idx = newState.findIndex((message) => message.id === action.message.id);
      newState.splice(idx, 1, action.message);
      return newState;
    case RECEIVE__DELETED_MESSAGE:
      idx = newState.findIndex((message) => message.id === action.message.id);
      newState.splice(idx, 1);
      return removeOneDate(newState);
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
    messages.length === 1 ||
    new Date(messages[messages.length - 1].created_at).getTime() >
      new Date(messages[messages.length - 2].created_at).getTime() + 1000 * 60 * 60 * 24
  ) {
    let newMessages = messages.slice(0);
    newMessages.splice(messages.length - 1, 0, {
      message_type: 'time',
      created_at: messages[messages.length - 1].created_at,
    });
    return newMessages;
  }
  return messages;
};

const removeOneDate = function (messages) {
  if (messages[messages.length - 1].message_type === 'time') {
    return messages.slice(0, messages.length - 1);
  }
  return messages;
};
