import { connect } from 'react-redux';
import { logout, signup, login } from '../../actions/sessions_actions';
import Workspace from './workspace';
import { updateChannel } from '../../actions/channel_actions';

const mapStateToProps = ({ session, channels }) => ({
  currentUser: session.currentUser,
  currentChannel: channels.currentChannel
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  updateChannel: (channel, member_ids) => dispatch(updateChannel(channel, member_ids))
});

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
