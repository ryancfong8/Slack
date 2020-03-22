import { connect } from 'react-redux';
import { logout, signup, login } from '../../actions/sessions_actions';
import Workspace from './workspace';

const mapStateToProps = ({ session, channels }) => ({
  currentUser: session.currentUser,
  currentChannel: channels.currentChannel
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
