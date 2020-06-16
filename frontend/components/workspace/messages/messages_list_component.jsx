import React, { useState } from 'react';
import moment from 'moment';
import MessagesEditor from './messages_editor';
import MessageButtons from './message_buttons';
import { Emoji } from 'emoji-mart';
import { Link } from 'react-router-dom';

const MessagesListComponent = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  const {
    message,
    showUserInfo,
    createMessage,
    currentUser,
    currentChannel,
    deleteMessage,
    updateMessage,
    messagesListHeight,
    createReaction,
    deleteReaction,
    messageClassName,
    refMessage,
    width,
  } = props;
  const className = `${messageClassName || ''} messages-list-component ${
    showUserInfo ? 'd-flex flex-row' : 'no-avatar'
  } ${showEdit && 'edit'}`;

  const handleEmoji = async (emoji, message) => {
    const reaction = {
      emoji: emoji.colons,
      message_id: message.id,
    };
    const existingReaction = message.reactions.find((r) => r.emoji === emoji.colons && r.has_reacted);
    if (existingReaction) {
      await deleteReaction(Object.assign({}, reaction, { id: existingReaction.id }));
    } else {
      await createReaction(reaction);
    }
  };

  if (!showUserInfo) {
    return (
      <div
        className={className}
        onMouseEnter={(e) => {
          e.preventDefault();
          setShowHoverButtons(true);
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          setShowHoverButtons(false);
        }}
        ref={refMessage}
      >
        {showHoverButtons && !showEdit && (
          <MessageButtons
            setShowEdit={setShowEdit}
            message={message}
            deleteMessage={deleteMessage}
            currentUser={currentUser}
            messagesListHeight={messagesListHeight}
            handleEmoji={handleEmoji}
            setShowHoverButtons={setShowHoverButtons}
            width={width}
          />
        )}
        {showEdit ? (
          <MessagesEditor
            createMessage={createMessage}
            updateMessage={updateMessage}
            currentUser={currentUser}
            currentChannel={currentChannel}
            setShowEdit={setShowEdit}
            message={message}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: message.body }} />
        )}
        <div className="mt-1 d-flex flex-wrap">
          {message.reactions.map((reaction) => (
            <button
              className={`reaction ${reaction.has_reacted && 'user-reaction'} mr-2 d-flex flex-row align-items-center`}
              onClick={(e) => {
                e.preventDefault();
                handleEmoji({ colons: reaction.emoji }, message);
              }}
              key={reaction.id + reaction.emoji}
            >
              <Emoji emoji={reaction.emoji} size={12} />

              <span className="ml-1">{reaction.likes}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div
      className={className}
      onMouseEnter={(e) => {
        e.preventDefault();
        setShowHoverButtons(true);
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setShowHoverButtons(false);
      }}
      ref={refMessage}
    >
      {showHoverButtons && !showEdit && (
        <MessageButtons
          setShowEdit={setShowEdit}
          message={message}
          deleteMessage={deleteMessage}
          currentUser={currentUser}
          messagesListHeight={messagesListHeight}
          handleEmoji={handleEmoji}
          setShowHoverButtons={setShowHoverButtons}
          width={width}
        />
      )}
      <img className="message-avatar" src={message.user.avatar_url} />
      <div className="d-flex flex-column flex-1">
        <div className="d-flex flex-row align-items-end mb-1">
          <Link className="mr-2 username" to={`/messages/${currentChannel.id}/users/${message.user.id}`}>
            {message.user.username}
          </Link>
          <div className="time">{moment(message.created_at).format('LT')}</div>
        </div>
        {showEdit ? (
          <MessagesEditor
            createMessage={createMessage}
            updateMessage={updateMessage}
            currentUser={currentUser}
            currentChannel={currentChannel}
            setShowEdit={setShowEdit}
            message={message}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: message.body }} />
        )}
        <div className="mt-1 d-flex flex-wrap">
          {message.reactions.map((reaction) => (
            <button
              key={`${reaction.emoji}${reaction.id}`}
              className={`reaction ${
                reaction.has_reacted && 'user-reaction'
              } mr-2 mb-1 d-flex flex-row align-items-center`}
              onClick={(e) => {
                e.preventDefault();
                handleEmoji({ colons: reaction.emoji }, message);
              }}
              key={reaction.id + reaction.emoji}
            >
              <Emoji emoji={reaction.emoji} size={12} /> <span className="ml-1">{reaction.likes}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesListComponent;
