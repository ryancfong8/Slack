import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../../actions/sessions_actions';
import { Account } from './account';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
