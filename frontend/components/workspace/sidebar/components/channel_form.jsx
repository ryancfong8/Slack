import React from 'react';
import Modal from '../../../util/modal';
import Input from '../../../forms//Input';
import Form from '../../../forms/Form';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = data => {
    const { onClose } = this.props;
    const { createChannel, history } = this.props;
    return createChannel(data).then(res => {
      onClose();
      history.push(`/messages/${res.channel.id}`);
    });
  };

  translateFunc(data) {
    delete data.description;
    data.channel_type = 'channel';
    return data;
  }
  body() {
    return (
      <Form onSubmit={this.onSubmit} className="create-channel-form" translateFunc={this.translateFunc}>
        <div className="optional mb-3">
          Channels are where your team communicates. They’re best when organized around a topic — #marketing, for
          example.
        </div>
        <div className="d-flex flex-column mb-3">
          <label htmlFor="title" className="mb-1">
            Name
          </label>
          <Input className="" name="title" placeholder=" # e.g. marketing" />
        </div>
        <div className="d-flex flex-column mb-3">
          <label className="mb-1" htmlFor="description">
            Description <span className="optional">(optional)</span>
          </label>
          <Input className="" name="description" placeholder="" />
          <div className="subtitle optional">What's this channel about?</div>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <label>Make Private</label>
        </div>
        <div className="d-flex flex-row justify-content-center">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </Form>
    );
  }

  render() {
    const { onClose } = this.props;
    return (
      <Modal
        header={<h3 className="create-channel-header">Create a Channel</h3>}
        body={this.body()}
        onClose={onClose}
        modalSize="modal-md modal-dialog-centered"
      />
    );
  }
}

export default ChannelForm;
