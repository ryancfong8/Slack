import * as MessageAPIUtil from '../util/messages_api_util';

export const RECEIVE__MESSAGES = 'RECEIVE__MESSAGES';
export const RECEIVE__MESSAGE = 'RECEIVE__MESSAGE';

const receiveMessages = messages => ({
  type: RECEIVE__MESSAGES,
  messages
});

const receiveMessage = message => ({
  type: RECEIVE__MESSAGE,
  message
});

export const getMessages = channelId => dispatch => {
  return MessageAPIUtil.getMessages(channelId).then(messages => dispatch(receiveMessages(Object.values(messages))));
};

export const createMessage = message => dispatch => {
  return MessageAPIUtil.createMessage(message).then(message => dispatch(receiveMessage(message)));
};
