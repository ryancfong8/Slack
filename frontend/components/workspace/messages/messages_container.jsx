import React from 'react';
import { connect } from 'react-redux';
import MessagesPage from './messages_page';
import { getCurrentChannel } from '../../../actions/channel_actions';
import { createMessage, getMessages } from '../../../actions/message_actions';

const mapStateToProps = state => ({
  messages: state.messages,
  currentChannel: state.channels.currentChannel,
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  createMessage: () => dispatch(createMessage),
  getCurrentChannel: id => dispatch(getCurrentChannel(id)),
  getMessages: id => dispatch(getMessages(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
