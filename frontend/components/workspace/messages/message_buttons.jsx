import React from 'react';

const MessageButtons = (props) => {
  const { setShowEdit, message, deleteMessage, currentUser } = props;

  const onEditClick = function (e) {
    e.preventDefault();
    setShowEdit(true);
  };

  const onDeleteClick = async function (e) {
    e.preventDefault();
    const confirm = window.confirm('Are you sure you want to delete this message?');
    if (confirm) {
      await deleteMessage(message);
      setShowEdit(false);
    }
  };

  return (
    <div className="message-buttons btn-group">
      {/* <button onClick={onEmojiClick}>
                <i className="fa fa-emoji"></i>
            </button> */}
      {currentUser.id === message.user.id && (
        <button className="btn btn-sm" onClick={onEditClick}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      )}
      {currentUser.id === message.user.id && (
        <button className="btn btn-sm" onClick={onDeleteClick}>
          <i className="fas fa-trash"></i>
        </button>
      )}
    </div>
  );
};

export default MessageButtons;
