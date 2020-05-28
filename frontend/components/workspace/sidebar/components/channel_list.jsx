import React from 'react';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';
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
      showForm: '',
    };
  }

  componentDidMount() {
    const { getChannels } = this.props;
    getChannels();
    this.setSockets();
  }

  componentDidUpdate(prevProps) {
    const { getChannels, channelType, currentUserId, channels, currentChannel, match } = this.props;
    // if (channels.length !== prevProps.channels.length || prevProps.match.params.channelId !== match.params.channelId) {
    if (channels.length !== prevProps.channels.length || prevProps.match.params.channelId !== match.params.channelId) {
      // getChannels().then(() => this.setSockets());
      this.setSockets();
    }
  }

  componentWillUnmount() {
    window.App.cable.subscriptions.subscriptions.forEach((sub) => this.removeSocket(sub));
  }

  addSocket = (channelName) => {
    const { alert, match, currentUserId, receiveHighlightedMessage } = this.props;
    window.App.cable.subscriptions.create(
      {
        channel: 'MessagesChannel',
        channel_name: channelName,
      },
      {
        connected: () => {},
        disconnected: () => {},
        received: (data) => {
          if (data.message.channel_id == match.params.channelId) {
            this.receiveMessage(data);
          } else {
            const icon = data.message.channel_private ? (
              <i className="fas fa-lock"></i>
            ) : (
              <i className="fas fa-hashtag"></i>
            );
            const channelName = getChannelName(
              {
                name: data.message.channel_name,
                channel_type: data.message.channel_type,
                members: data.message.channel_members,
              },
              currentUserId
            );
            const alertComponent = alert.show(
              <Link
                className="alert-link"
                to={`/messages/${data.message.channel_id}`}
                onClick={(e) => {
                  receiveHighlightedMessage(data.message.id);
                  alert.remove(alertComponent);
                }}
              >
                <span>
                  {`New message from ${data.message.user.username} in `}
                  {data.message.channel_type === 'channel' ? (
                    icon
                  ) : (
                    <>
                      <span className="green mr-1">•</span>
                    </>
                  )}
                  {channelName}
                </span>
              </Link>
            );
          }
        },
      }
    );
  };

  removeSocket = (channel) => {
    window.App.cable.subscriptions.remove(channel);
  };

  setSockets = () => {
    const { channels, channelType } = this.props;
    if (channels.length > 0) {
      window.App.cable.subscriptions.subscriptions.forEach((sub) => {
        // only remove subs that are channels from props
        if (channelType === 'direct') {
          if (sub.identifier.includes(channelType)) {
            this.removeSocket(sub);
          }
        } else {
          if (!sub.identifier.includes('direct')) {
            this.removeSocket(sub);
          }
        }
      });
      channels.forEach((channel) => {
        this.addSocket(`${channel.channel_type}_${channel.id}`);
      });
    }
  };

  receiveMessage = (data) => {
    const { currentChannel, receiveMessage, match } = this.props;
    if (data.message.channel_id == match.params.channelId) {
      receiveMessage(data.message);
    } else {
      // this.sendAlert(data);
    }
  };

  setModal = (modalType) => {
    this.setState({
      showForm: modalType,
    });
  };

  closeModal = () => {
    this.setState({
      showForm: '',
    });
  };

  render() {
    const {
      channels,
      channelType,
      currentChannel,
      createChannel,
      currentUserId,
      history,
      toggleMobileSidebar,
    } = this.props;
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
            channels={channels}
            toggleMobileSidebar={toggleMobileSidebar}
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
            channels={channels}
            toggleMobileSidebar={toggleMobileSidebar}
          />
        );
        break;
      case CHANNEL__BROWSE:
        currentForm = (
          <BrowseChannelForm onClose={this.closeModal} history={history} toggleMobileSidebar={toggleMobileSidebar} />
        );
        break;
      default:
        currentForm = null;
        break;
    }
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
                onClick={(e) => {
                  e.preventDefault();
                  this.setModal(CHANNEL__DIRECT);
                }}
              ></i>
            </div>
          )}
        </div>
        {channels
          .filter((channel) => channel.members.filter((member) => member.id === currentUserId).length > 0)
          .map((channel, index) => (
            <ChannelListItem
              channel={channel}
              currentUserId={currentUserId}
              key={channel.id}
              currentChannel={currentChannel}
              toggleMobileSidebar={toggleMobileSidebar}
            />
          ))}
        {showForm && currentForm}
      </div>
    );
  }
}

const AddChannelButton = (props) => {
  const { setModal } = props;
  return (
    <div className="dropdown">
      <i className="fa fa-plus-circle add-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
      <div className="dropdown-menu">
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setModal(CHANNEL__BROWSE);
          }}
        >
          Browse Channels
        </a>
        <a
          className="dropdown-item"
          href="#"
          onClick={(e) => {
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

const ChannelListItem = (props) => {
  const { channel, currentUserId, currentChannel, toggleMobileSidebar } = props;
  if (!channel) return null;
  const icon = channel.channel_private ? <i className="fas fa-lock mr-1"></i> : <i className="fas fa-hashtag mr-1"></i>;
  const channelName = getChannelName(channel, currentUserId);
  return (
    <Link
      to={`/messages/${channel.id}`}
      onClick={() => {
        toggleMobileSidebar(false);
      }}
    >
      <div
        className={`channel-list-link d-flex flex-row align-items-center ${
          currentChannel && channel.id === currentChannel.id ? 'active' : ''
        }`}
      >
        {channel.channel_type === 'channel' ? (
          icon
        ) : (
          <>
            <span className="green mr-1">•</span>
          </>
        )}
        {channelName}
      </div>
    </Link>
  );
};

export default withAlert()(ChannelList);
