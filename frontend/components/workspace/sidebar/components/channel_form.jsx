import React from 'react';
import Modal from '../../../util/modal';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
  }

  body() {
    return (
      <div>
        <p>
          Channels are where your team communicates. They’re best when organized around a topic — #marketing, for
          example.
        </p>
        <form>
          <label>Name</label>
          <input placeholder=" # e.g. marketing" />
          <label>Description (optional)</label>
          <input placeholder="" />
          <div>
            <span>Make Private</span>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <a href="#">Learn More</a>
            <button type="submit" className="button">
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { onClose } = this.props;
    return <Modal header="Create Channel" body={this.body()} onClose={onClose} />;
  }
}

export default ChannelForm;
