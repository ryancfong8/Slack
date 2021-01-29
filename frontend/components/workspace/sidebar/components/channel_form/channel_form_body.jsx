import React from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import Input from '../../../../forms/Input';

const ChannelFormBody = ({ onSubmit, form, formProps, setForm, joinChannel, currentUserId, history, onClose }) => {
  const { channel_private, name } = form;
  const { nameError, errorMsg, showGoToChannel, showJoin, existingChannelId } = formProps;
  const renderChannelLinks = () => (
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
  );

  const update = (field) => {
    return (e) => {
      setForm({ ...form, [field]: e.target.value });
    };
  };
  const inputIcon = channel_private ? (
    <i className="fas fa-lock input-icon"></i>
  ) : (
    <i className="fas fa-hashtag input-icon"></i>
  );

  return (
    <form onSubmit={onSubmit} className="create-channel-form" autoComplete="off">
      <div className="optional mb-3">
        Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
      </div>
      {errorMsg && renderChannelLinks()}
      <Input
        labelName="Name"
        placeholder="e.g. marketing"
        inputClassName="channel-name-input"
        onChange={update('name')}
        icon={inputIcon}
        fieldError={nameError}
      />
      <Input
        labelName="Description"
        subLabel={<span className="optional ml-1">(optional)</span>}
        onChange={update('description')}
        subtitle="What's this channel about?"
      />
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
          onChange={(e) => setForm({ ...form, channel_private: !channel_private })}
        />
      </div>
      <div className="d-flex flex-row justify-content-center">
        <button type="submit" className="btn btn-primary" disabled={name ? false : true}>
          Create
        </button>
      </div>
    </form>
  );
};

export default ChannelFormBody;
