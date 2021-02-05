import React, { useState, useRef, useEffect } from 'react';
import { EmojiModal } from './emoji_modal';

const MessageButtons = (props) => {
  const { setShowEdit, message, deleteMessage, currentUser, handleEmoji, setShowHoverButtons, width } = props;

  const [openEmojiMenu, setOpenEmojiMenu] = useState(false);
  const [bounding, setBounding] = useState({});
  const buttonsRef = useRef(null);
  useEffect(() => {
    if (buttonsRef && buttonsRef.current) {
      setBounding(buttonsRef.current.getBoundingClientRect());
    }
  }, []);

  const onEditClick = function (e) {
    e.preventDefault();
    setShowEdit(true);
  };

  const onDeleteClick = function (e) {
    e.preventDefault();
    const confirm = window.confirm('Are you sure you want to delete this message?');
    if (confirm) {
      deleteMessage(message);
    }
  };

  const onEmojiButtonClick = function (e) {
    if (e) e.preventDefault();
    setOpenEmojiMenu(!openEmojiMenu);
  };

  const closeEmojiMenu = function (e) {
    if (e) e.preventDefault();
    setOpenEmojiMenu(false);
    setShowHoverButtons(false);
  };

  // check if emoji menu will appear out of viewport
  const position = {};
  if (bounding && bounding.top) {
    position.right = -(353 / 2) + 80;
    // dimensions menu is 353px W X 425px H
    if (bounding.top - 425 < 0 && bounding.bottom + 425 > window.innerHeight) {
      position.top = '50%';
    } else if (bounding.top - 425 < 0) {
      // Top is out of viewport
      position.top = bounding.bottom + 425 / 2;
    } else {
      position.top = bounding.top - 425 / 2;
    }
  }

  const onEmojiSelect = function (emoji) {
    handleEmoji(emoji, message);
    setOpenEmojiMenu(false);
    setShowHoverButtons(false);
  };

  return (
    <>
      <div className={`message-buttons ${currentUser.id === message.user.id && 'btn-group'}`}>
        <button onClick={onEmojiButtonClick} className="btn btn-sm" ref={buttonsRef}>
          <i className="far fa-laugh"></i>
        </button>
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
      <EmojiModal
        position={position}
        openEmojiMenu={openEmojiMenu}
        closeEmojiMenu={closeEmojiMenu}
        onEmojiSelect={onEmojiSelect}
        width={width}
      />
    </>
  );
};

export default MessageButtons;
