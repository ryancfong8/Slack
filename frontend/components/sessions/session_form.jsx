import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Modal from '../util/modal';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalOpen: false,
      modalType: 'Log In',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLoginGuest = this.handleLoginGuest.bind(this);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push('/');
    }
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.modalType === 'Log In') {
      this.props.login(this.state);
    } else {
      this.props.signup(this.state);
    }
    this.props.clearErrors();
  }

  // navLink() {
  // 	if (this.state.modalType === "login") {
  //   	return <button className="modal-button" onClick={this.openModal.bind(this, 'signup')}>Sign Up Instead!</button>;
  // 	}
  // 	else {
  // 		return <button className="modal-button" onClick={this.openModal.bind(this, 'login')}>Login instead!</button>;
  //  	}
  // }

  openModal(modalType) {
    this.setState({
      username: '',
      password: '',
      modalOpen: true,
      modalType,
    });
    this.props.clearErrors();
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.clearErrors();
  }

  handleLoginGuest(e) {
    e.preventDefault();
    this.props.loginGuestUser();
  }

  guestUser() {
    const { modalType } = this.state;
    return (
      <div className="guest d-flex flex-column align-items-center mt-3">
        <span className="mb-3">
          {modalType === 'Log In' ? 'New to Chathero? ' : 'Already have an account? '}
          <a
            href="#"
            className="login-link mb-3"
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                modalType: modalType === 'Log In' ? 'Sigh Up' : 'Log In',
              });
            }}
          >
            Sign {modalType === 'Log In' ? 'Up' : 'In'}
          </a>
        </span>
        <a href="#" className="login-link" onClick={this.handleLoginGuest}>
          Demo as Guest User
        </a>
      </div>
    );
  }

  renderErrors() {
    if (this.props.errors) {
      return (
        <ul className="ErrorList">
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`} className="Error-List-Item">
              {error}
            </li>
          ))}
        </ul>
      );
    }
  }

  modalForm() {
    const { modalType } = this.state;
    return (
      <form className="form d-flex flex-column align-items-center">
        <h4 className="modal-title mb-2">{`Welcome ${modalType === 'Log In' ? 'back' : ''} to ChatHero!`}</h4>
        {this.renderErrors()}
        <input
          type="text"
          value={this.state.username}
          onChange={this.update('username')}
          className="login-input mb-2 input-width"
          placeholder="Username"
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.update('password')}
          className="login-input mb-2 input-width"
          placeholder="Password"
        />
        <button className="modal-submit btn btn-primary input-width" type="sumbit" onClick={this.handleSubmit}>
          {this.state.modalType}
        </button>
        {this.guestUser()}
      </form>
    );
  }

  render() {
    const { modalOpen } = this.state;
    return (
      <div className="login">
        <nav className="login-signup">
          <button onClick={this.openModal.bind(this, 'Log In')} className="btn login-btn mr-3">
            Log In
          </button>
          <button onClick={this.openModal.bind(this, 'Sign Up')} className="btn signup-btn">
            Sign Up
          </button>
        </nav>
        {modalOpen && (
          <Modal onClose={this.closeModal} body={this.modalForm()} modalSize="modal-md modal-dialog-centered" />
        )}
      </div>
    );
  }
}

export default withRouter(SessionForm);
