import React from 'react';
import { Link } from 'react-router-dom';
import ChannelForm from './channel_form';
import DirectChannelForm from './channel_direct';
import BrowseChannelForm from './channel_browse';
import { getChannelName } from '../../../util/utils';

const CHANNEL__NEW = 'CHANNEL__NEW';
const CHANNEL__DIRECT = 'CHANNEL__DIRECT';
const CHANNEL__BROWSE = 'CHANNEL__BROWSE';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: ''
    };
  }

  componentDidMount() {
    const { getChannels } = this.props;
    getChannels();
  }

  componentDidUpdate(prevProps) {
    const { getChannels, channelType, currentUserId } = this.props;
    if (channelType !== prevProps.channelType || currentUserId !== prevProps.currentUserId) {
      getChannels();
    }
  }

  setModal = modalType => {
    this.setState({
      showForm: modalType
    });
  };

  closeModal = () => {
    this.setState({
      showForm: ''
    });
  };

  render() {
    const { channels, channelType, currentChannel, createChannel, currentUserId, history } = this.props;
    const { showForm } = this.state;
    let currentForm;
    switch (showForm) {
      case CHANNEL__NEW:
        currentForm = (
          <ChannelForm
            onClose={this.closeModal}
            createChannel={createChannel}
            currentUserId={currentUserId}
            history={history}
          />
        );
        break;
      case CHANNEL__DIRECT:
        currentForm = (
          <DirectChannelForm
            onClose={this.closeModal}
            createChannel={createChannel}
            currentUserId={currentUserId}
            history={history}
          />
        );
        break;
      case CHANNEL__BROWSE:
        currentForm = <BrowseChannelForm onClose={this.closeModal} history={history} />;
        break;
      default:
        currentForm = null;
        break;
    }
    console.log('channels === ', channels);
    console.log(
      'channels filterd === ',
      channels.filter(channel => channel.members.filter(member => member.id === currentUserId).length > 0)
    );
    return (
      <div className="channel-list">
        <div className="heading d-flex flex-row justify-content-between">
          <span>{channelType === 'channel' ? 'Channels' : 'Direct Messages'}</span>
          {channelType === 'channel' ? (
            <AddChannelButton channelType={channelType} setModal={this.setModal} />
          ) : (
            <div>
              <i
                className="fa fa-plus-circle add-button"
                aria-hidden="true"
                onClick={e => {
                  e.preventDefault();
                  this.setModal(CHANNEL__DIRECT);
                }}
              ></i>
            </div>
          )}
        </div>
        {channels
          .filter(channel => channel.members.filter(member => member.id === currentUserId).length > 0)
          .map((channel, index) => (
            <ChannelListItem
              channel={channel}
              currentUserId={currentUserId}
              key={channel.id}
              currentChannel={currentChannel}
            />
          ))}
        {showForm && currentForm}
      </div>
    );
  }
}

const AddChannelButton = props => {
  const { setModal } = props;
  return (
    <div className="dropdown">
      <i className="fa fa-plus-circle add-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
      <div className="dropdown-menu">
        <a
          className="dropdown-item"
          href="#"
          onClick={e => {
            e.preventDefault();
            setModal(CHANNEL__BROWSE);
          }}
        >
          Browse Channels
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={e => {
            e.preventDefault();
            setModal(CHANNEL__NEW);
          }}
        >
          Create Channel
        </a>
      </div>
    </div>
  );
};

const ChannelListItem = props => {
  const { channel, currentUserId, currentChannel } = props;
  if (!channel) return null;
  const icon = channel.channel_private ? <i className="fas fa-lock mr-1"></i> : <i className="fas fa-hashtag mr-1"></i>;
  let channelName = getChannelName(channel, currentUserId);
  return (
    <Link to={`/messages/${channel.id}`}>
      <div
        className={`channel-list-link d-flex flex-row align-items-center ${
          currentChannel && channel.id === currentChannel.id ? 'active' : ''
        }`}
      >
        {channel.channel_type === 'channel' ? icon : '•'} {channelName}
      </div>
    </Link>
  );
};

export default ChannelList;
