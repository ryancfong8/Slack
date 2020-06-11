import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { uniqueNamesGenerator, names, colors, animals } from 'unique-names-generator';

import Modal from '../util/modal';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
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
    if (e) e.preventDefault();
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

  openModal(modalType, cb = () => {}) {
    this.setState(
      {
        username: '',
        password: '',
        modalOpen: true,
        modalType,
      },
      cb
    );
    this.props.clearErrors();
  }

  closeModal() {
    this.setState({ modalOpen: false });
    this.props.clearErrors();
  }

  handleLoginGuest(e) {
    if (e) e.preventDefault();
    const name = uniqueNamesGenerator({
      dictionaries: [names, names],
      length: 2,
      separator: ' ',
      style: 'capital',
    });
    const username = name.toLowerCase().split(' ').join('_');
    const password = makePassword(8);
    this.setState(
      {
        modalType: 'Sign Up',
        demo: true,
      },
      () => {
        this.demoLogin(username, name, password);
      }
    );
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
        {modalType !== 'Log In' && (
          <input
            type="text"
            value={this.state.name}
            onChange={this.update('name')}
            className="login-input mb-2 input-width"
            placeholder="Full Name (optional)"
          />
        )}
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

  demoLogin = (usernameArg, nameArg, passwordArg) => {
    const { username, name, password } = this.state;
    if (usernameArg.length > username.length) {
      const idx = username.length;
      window.setTimeout(() => this.setState({ username: username + usernameArg[idx] }), 100);
      window.setTimeout(() => this.demoLogin(usernameArg, nameArg, passwordArg), 100);
    }

    if (usernameArg.length === username.length && nameArg.length > name.length) {
      const idx = name.length;
      window.setTimeout(() => this.setState({ name: name + nameArg[idx] }), 100);
      window.setTimeout(() => this.demoLogin(usernameArg, nameArg, passwordArg), 100);
    }

    if (
      passwordArg.length > password.length &&
      usernameArg.length === username.length &&
      nameArg.length === name.length
    ) {
      const idx = password.length;
      window.setTimeout(() => this.setState({ password: password + passwordArg[idx] }), 100);
      window.setTimeout(() => this.demoLogin(usernameArg, nameArg, passwordArg), 100);
    }

    if (
      passwordArg.length === password.length &&
      usernameArg.length === username.length &&
      nameArg.length === name.length
    ) {
      this.handleSubmit();
    }
  };

  render() {
    const { demoButton } = this.props;
    const { modalOpen } = this.state;
    return (
      <div className="login">
        {demoButton ? (
          <button
            className="btn btn-primary mr-3"
            onClick={(e) => {
              this.openModal('Sign Up', () => {
                this.handleLoginGuest();
              });
            }}
          >
            Demo as Guest User
          </button>
        ) : (
          <nav className="login-signup">
            <button
              onClick={(e) => {
                e.preventDefault();
                this.openModal('Log In');
              }}
              className="btn login-btn mr-3"
            >
              Log In
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                this.openModal('Sign Up');
              }}
              className="btn signup-btn"
            >
              Sign Up
            </button>
          </nav>
        )}
        {modalOpen && (
          <Modal onClose={this.closeModal} body={this.modalForm()} modalSize="modal-md modal-dialog-centered" />
        )}
      </div>
    );
  }
}

export default withRouter(SessionForm);

function makePassword(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
