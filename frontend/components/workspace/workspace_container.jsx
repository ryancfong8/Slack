import { connect } from 'react-redux';
import { logout, signup, login } from '../../actions/sessions_actions';
import Workspace from './workspace';
import { updateChannel } from '../../actions/channel_actions';
import { getUser, updateUser } from '../../actions/users_actions';
import { getMessages, receiveHighlightedMessage } from '../../actions/message_actions';

const mapStateToProps = ({ session, channels, users }) => ({
  currentUser: session.currentUser,
  currentChannel: channels.currentChannel,
  selectedUser: users.selectedUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  updateChannel: (channel, member_ids) => dispatch(updateChannel(channel, member_ids)),
  getUser: (id) => dispatch(getUser(id)),
  updateUser: (user) => dispatch(updateUser(user)),
  getMessages: (id) => dispatch(getMessages(id)),
  receiveHighlightedMessage: (id) => dispatch(receiveHighlightedMessage(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
