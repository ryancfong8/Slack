import * as MessageAPIUtil from '../util/messages_api_util';
import * as ReactionAPIUtil from '../util/reaction_api_util';

export const RECEIVE__MESSAGES = 'RECEIVE__MESSAGES';
export const RECEIVE__MESSAGE = 'RECEIVE__MESSAGE';
export const RECEIVE__UPDATED_MESSAGE = 'RECEIVE__UPDATED_MESSAGE';
export const RECEIVE__DELETED_MESSAGE = 'RECEIVE__DELETED_MESSAGE';

const receiveMessages = (messages) => ({
  type: RECEIVE__MESSAGES,
  messages,
});

export const receiveMessage = (message) => ({
  type: RECEIVE__MESSAGE,
  message,
});

export const receiveUpdatedMessage = (message) => ({
  type: RECEIVE__UPDATED_MESSAGE,
  message,
});

export const receiveDeletedMessage = (message) => ({
  type: RECEIVE__DELETED_MESSAGE,
  message,
});

export const getMessages = (channelId) => (dispatch) => {
  return MessageAPIUtil.getMessages(channelId).then((messages) => dispatch(receiveMessages(Object.values(messages))));
};

export const createMessage = (message) => (dispatch) => {
  return MessageAPIUtil.createMessage(message);
};

export const updateMessage = (message) => (dispatch) => {
  return MessageAPIUtil.updateMessage(message);
};

export const deleteMessage = (message) => (dispatch) => {
  return MessageAPIUtil.deleteMessage(message).then(() => dispatch(receiveDeletedMessage(message)));
};

export const createReaction = (reaction) => (dispatch) => {
  return ReactionAPIUtil.createReaction(reaction).then((message) => dispatch(receiveUpdatedMessage(message)));
};

export const deleteReaction = (reaction) => (dispatch) => {
  return ReactionAPIUtil.deleteReaction(reaction).then((message) => dispatch(receiveUpdatedMessage(message)));
};
