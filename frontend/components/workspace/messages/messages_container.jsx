import React from 'react';
import { connect } from 'react-redux';
import MessagesPage from './messages_page';
import { getCurrentChannel } from '../../../actions/channel_actions';
import { createMessage, getMessages, updateMessage, deleteMessage } from '../../../actions/message_actions';

const mapStateToProps = (state) => ({
  messages: state.messages,
  currentChannel: state.channels.currentChannel,
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (message) => dispatch(createMessage(message)),
  updateMessage: (message) => dispatch(updateMessage(message)),
  deleteMessage: (message) => dispatch(deleteMessage(message)),
  getCurrentChannel: (id) => dispatch(getCurrentChannel(id)),
  getMessages: (id) => dispatch(getMessages(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
