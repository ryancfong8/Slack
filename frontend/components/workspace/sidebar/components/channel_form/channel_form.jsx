import React, { useState } from 'react';
import Modal from '../../../../util/modal';
import merge from 'lodash/merge';
import ChannelFormBody from './channel_form_body';

const ChannelForm = ({
  onClose,
  toggleMobileSidebar,
  currentUserId,
  joinChannel,
  history,
  createChannel,
  channels,
}) => {
  const defaultForm = {
    name: '',
    channel_type: 'channel',
    channel_private: false,
    description: '',
  };

  const defaultFormProps = {
    nameError: '',
    errorMsg: '',
    showJoin: false,
    existingChannelId: '',
    showGoToChannel: false,
  };

  const [form, setForm] = useState(defaultForm);
  const [formProps, setFormProps] = useState(defaultFormProps);
  const channel_private = form.channel_private;

  // submit function
  const onSubmit = (form) => {
    // translate form values
    const newChannel = translateFunc(form);
    // validate form values
    if (!validateFunc(newChannel)) return false;
    // create channel
    createChannel(newChannel).then((res) => {
      history.push(`/messages/${res.channel.id}`);
      toggleMobileSidebar(false);
      onClose();
    });
  };

  // transform input values into correct form values
  const translateFunc = (form) => {
    // lowercase name and remove special characters
    const newName = form.name.replace(/[^1-9a-zA-Z-]/g, '-').toLowerCase();
    // replace new name in form
    const newChannel = merge({}, form, { name: newName });
    return newChannel;
  };

  // validate form inputs
  const validateFunc = (form) => {
    // check for existence of name
    if (!form.name) {
      setFormProps({
        ...formProps,
        nameError: 'Name is required',
      });
      return false;
    }
    const existingChannel = channels.find((channel) => channel.name === form.name);
    if (existingChannel) {
      // check if user is already a member of the channel
      // show option to navigate to channel
      if (existingChannel.members.find((member) => member.id === currentUserId)) {
        setFormProps({
          ...formProps,
          existingChannelId: existingChannel.id,
          errorMsg: 'You are part of a channel with this name that already exists.',
          showGoToChannel: true,
          showJoin: false,
        });
      } else {
        // check if existing channel it is a private channel
        // if it is a private channel, display error message for user to change name
        // if it is a public channel, show option to join channel
        if (existingChannel.channel_private) {
          setFormProps({
            ...formProps,
            errorMsg: 'A private channel with this name already exists. Please select a new channel name.',
            showGoToChannel: false,
            showJoin: false,
          });
        } else {
          setFormProps({
            ...formProps,
            existingChannelId: existingChannel.id,
            errorMsg: 'A public channel with this name already exists.',
            showGoToChannel: false,
            showJoin: true,
          });
        }
      }
      return false;
    }
    return true;
  };

  return (
    <Modal
      header={
        <h3 className="create-channel-header">
          Create a {channel_private && 'private '}
          channel
        </h3>
      }
      body={
        <ChannelFormBody
          form={form}
          setForm={setForm}
          formProps={formProps}
          joinChannel={joinChannel}
          currentUserId={currentUserId}
          history={history}
          onClose={onClose}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        />
      }
      onClose={onClose}
      modalSize="modal-md modal-dialog-centered"
    />
  );
};

export default ChannelForm;
