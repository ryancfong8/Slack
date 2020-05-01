import React, { useState } from 'react';
import moment from 'moment';
import MessagesEditor from './messages_editor';
import MessageButtons from './message_buttons';

const MessagesListComponent = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showHoverButtons, setShowHoverButtons] = useState(false);

  const { message, showUserInfo, createMessage, currentUser, currentChannel, deleteMessage, updateMessage } = props;
  const className = `messages-list-component ${showUserInfo ? 'd-flex flex-row' : 'no-avatar'} ${showEdit && 'edit'}`;

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
      >
        {showHoverButtons && !showEdit && (
          <MessageButtons
            setShowEdit={setShowEdit}
            message={message}
            deleteMessage={deleteMessage}
            currentUser={currentUser}
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
    >
      {showHoverButtons && !showEdit && (
        <MessageButtons
          setShowEdit={setShowEdit}
          message={message}
          deleteMessage={deleteMessage}
          currentUser={currentUser}
        />
      )}
      <img className="message-avatar" src={message.user.avatar_url} />
      <div className="d-flex flex-column flex-1">
        <div className="d-flex flex-row align-items-end mb-1">
          <span className="mr-2 username">{message.user.username}</span>
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
      </div>
    </div>
  );
};

export default MessagesListComponent;
