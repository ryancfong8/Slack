import React from 'react';
import request from 'superagent';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        username: '',
        avatar_url: '',
      },
      userNameError: '',
    };
    this.inputFile = React.createRef();
  }

  componentDidMount() {
    const { currentUser } = this.props;
    this.setState({ form: currentUser });
  }

  update = (field) => {
    return (e) => {
      const { form } = this.state;
      const newField = { [field]: e.target.value };
      this.setState({ form: Object.assign({}, form, newField) });
    };
  };

  validateForm = (form) => {
    if (!form.username) {
      this.setState({ userNameError: 'Username is required' });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { form } = this.state;
    if (!this.validateForm(form)) return false;
    const { updateUser, onClose, getMessages, currentChannel } = this.props;
    updateUser(form).then(async () => {
      await getMessages(currentChannel.id);
      onClose();
    });
  };

  handleImageUpload = (file) => {
    const CLOUDINARY_UPLOAD_PRESET = 'chathero';
    const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/ryancfong8/image/upload';
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      const { form } = this.state;
      if (response.body.secure_url !== '') {
        this.setState({
          form: Object.assign({}, form, { avatar_url: response.body.secure_url }),
        });
      }
    });
  };

  render() {
    const { onClose } = this.props;
    const { form, userNameError } = this.state;
    return (
      <form className="user-form d-flex flex-column" onSubmit={this.onSubmit}>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column mr-4">
            <div className="user-form-field">
              <label htmlFor="username">Display name</label>
              {userNameError && <div className="text-danger">{userNameError}</div>}
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={this.update('username')}
                autoComplete="off"
              />
              <div className="subtitle">
                This could be your first name, or a nickname — however you’d like people to refer to you in Slack.
              </div>
            </div>
            <div className="user-form-field">
              <label htmlFor="name">
                Full name <span className="subtitle">(optional)</span>
              </label>
              <input name="name" type="text" value={form.name} onChange={this.update('name')} autoComplete="off" />
            </div>
          </div>
          <div className="user-form-field profile-photo d-flex flex-column align-items-center">
            <div>
              <label>Profile Photo</label>
              <img className="user-form-avatar mt-2 mb-2" src={form.avatar_url} />
            </div>
            <label>
              <div className="btn cancel-btn d-flex flex-row align-items-center">Upload an Image</div>
              <input
                className="hidden-input"
                type="file"
                onChange={(e) => {
                  e.target.files && this.handleImageUpload(e.target.files[0]);
                }}
                ref={this.fileInput}
              />
            </label>
            <a
              href="#"
              className=""
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  avatar_url: '',
                });
              }}
            >
              Remove photo
            </a>
          </div>
        </div>
        <div className="buttons d-flex flex-row justify-content-end mt-3">
          <button className="btn btn-sm cancel-btn mr-3" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-primary submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    );
  }
}

export default UserEditForm;
