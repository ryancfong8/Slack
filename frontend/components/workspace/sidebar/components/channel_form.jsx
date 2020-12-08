import React from 'react';
import Modal from '../../../util/modal';
import Toggle from 'react-toggle';
import merge from 'lodash/merge';
import { Link } from 'react-router-dom';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      channel_type: 'channel',
      channel_private: false,
      description: '',
      nameError: '',
      errorMsg: '',
      showJoin: false,
      existingChannelId: '',
      showGoToChannel: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { onClose, toggleMobileSidebar, currentUserId } = this.props;
    const { createChannel, history, channels } = this.props;
    const { name } = this.state;
    // translate func
    // lowercase name and remove special characters
    const newName = name.replace(/[^1-9a-zA-Z-]/g, '-').toLowerCase();
    const existingChannel = channels.find((channel) => channel.name === newName);
    if (existingChannel) {
      if (existingChannel.members.find((member) => member.id === currentUserId)) {
        this.setState({
          existingChannelId: existingChannel.id,
          errorMsg: 'You are part of a channel with this name that already exists.',
          showGoToChannel: true,
          showJoin: false,
        });
      } else {
        if (existingChannel.channel_private) {
          this.setState({
            errorMsg: 'A private channel with this name already exists. Please select a new channel name.',
            showGoToChannel: false,
            showJoin: false,
          });
        } else {
          this.setState({
            existingChannelId: existingChannel.id,
            errorMsg: 'A public channel with this name already exists.',
            showGoToChannel: false,
            showJoin: true,
          });
        }
      }
      return;
    }
    const newChannel = merge({}, this.state, { name: newName });
    // validate presence of name
    if (!newChannel.name) {
      this.setState({
        nameError: 'Name is required',
      });
      return;
    }
    createChannel(newChannel).then((res) => {
      history.push(`/messages/${res.channel.id}`);
      toggleMobileSidebar(false);
      onClose();
    });
  };

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  body() {
    const { joinChannel, currentUserId, history, onClose } = this.props;
    const { channel_private, nameError, name, errorMsg, showGoToChannel, showJoin, existingChannelId } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="create-channel-form" autoComplete="off">
        <div className="optional mb-3">
          Channels are where your team communicates. They’re best when organized around a topic — #marketing, for
          example.
        </div>
        {errorMsg && (
          <span>
            <span className="text-danger">{errorMsg}</span>
            {showGoToChannel && (
              <Link
                className="ml-1 create-channel-link"
                to={`/messages/${existingChannelId}`}
                onClick={(e) => {
                  onClose();
                }}
              >
                Go To Channel
              </Link>
            )}
            {showJoin && (
              <a
                href="#"
                className="ml-1 create-channel-link"
                onClick={(e) => {
                  e.preventDefault();
                  joinChannel({ channel_id: existingChannelId, user_id: currentUserId }).then(() => {
                    onClose();
                    history.push(`/messages/${existingChannelId}`);
                  });
                }}
              >
                Join Channel
              </a>
            )}
          </span>
        )}
        <div className="d-flex flex-column mb-3">
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          {nameError && <div className="text-danger mb-1">{nameError}</div>}
          <div className="channel-input-container">
            <input
              id="name"
              className=""
              name="name"
              placeholder="e.g. marketing"
              className="channel-name-input"
              onChange={this.update('name')}
              autoComplete="off"
            />
            {channel_private ? (
              <i className="fas fa-lock input-icon"></i>
            ) : (
              <i className="fas fa-hashtag input-icon"></i>
            )}
          </div>
        </div>
        <div className="d-flex flex-column mb-3">
          <label className="mb-1" htmlFor="description">
            Description <span className="optional">(optional)</span>
          </label>
          <input
            id="description"
            className=""
            name="description"
            placeholder=""
            onChange={this.update('description')}
            autoComplete="off"
          />
          <div className="subtitle optional">What's this channel about?</div>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <label htmlFor="ChannelPrivate">
            Make Private
            <div className="optional">
              {channel_private ? (
                <>
                  <span className="font-weight-bold mr-1">This can’t be undone.</span>
                  <span>A private channel cannot be made public later on.</span>
                </>
              ) : (
                <>When a channel is set to private, it can only be viewed or joined by invitation.</>
              )}
            </div>
          </label>
          <Toggle
            id="ChannelPrivate"
            name="channel_private"
            defaultChecked={channel_private}
            icons={false}
            onChange={(e) => this.setState({ channel_private: !channel_private })}
          />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={name ? false : true}>
            Create
          </button>
        </div>
      </form>
    );
  }

  render() {
    const { onClose } = this.props;
    const { channel_private } = this.state;
    return (
      <Modal
        header={<h3 className="create-channel-header">Create a {channel_private && 'private '}channel</h3>}
        body={this.body()}
        onClose={onClose}
        modalSize="modal-md modal-dialog-centered"
      />
    );
  }
}

export default ChannelForm;
