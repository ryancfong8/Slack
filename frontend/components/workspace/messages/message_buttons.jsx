import React, { useState, useRef } from 'react';
import { Picker } from 'emoji-mart';
import Modal from '../../util/modal';
import ClickOutsideWrapper from '../../util/click_outsider_wrapper';

const MessageButtons = (props) => {
  const { setShowEdit, message, deleteMessage, currentUser, handleEmoji, messagesListHeight } = props;

  const [openEmojiMenu, setOpenEmojiMenu] = useState(false);
  const buttonsRef = useRef(null);

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

  const onEmojiButtonClick = function (e) {
    if (e) e.preventDefault();
    setOpenEmojiMenu(!openEmojiMenu);
  };

  const closeEmojiMenu = function (e) {
    if (e) e.preventDefault();
    setOpenEmojiMenu(false);
  };

  // check if emoji menu will appear out of viewport
  let positionEmojiMenuClassName = 'render-top';
  if (buttonsRef && buttonsRef.current) {
    const bounding = buttonsRef.current.getBoundingClientRect();
    // dimensions menu is 353px W X 355px H
    if (bounding.top - (355 + 60) < 0) {
      // Top is out of viewport
      positionEmojiMenuClassName = 'render-bottom';
    }
    // if (bounding.bottom + 355 > 60 + messagesListHeight) {
    //   // Bottom is out of viewport
    //   if (positionEmojiMenuClassName === 'render-bottom') {
    //     positionEmojiMenuClassName = 'render-modal';
    //   }
    // }
    // if (bounding.left - (353 + 220) < 0) {
    //   // Left side is out of viewport and sidebar
    //   positionEmojiMenuClassName = 'render-modal';
    // }
  }

  const onEmojiSelect = function (emoji) {
    handleEmoji(emoji, message);
    setOpenEmojiMenu(false);
  };

  return (
    <div className="message-buttons btn-group" ref={buttonsRef}>
      <button onClick={onEmojiButtonClick} className="btn btn-sm">
        <i className="far fa-laugh"></i>
      </button>
      {openEmojiMenu &&
        (positionEmojiMenuClassName === 'render-modal' ? (
          <Modal
            body={<Picker showPreview={false} showSkinTones={false} emojiTooltip={true} />}
            onClose={onEmojiButtonClick}
            modalSize="modal-md modal-dialog-centered"
          />
        ) : (
          <ClickOutsideWrapper onClickOutside={closeEmojiMenu}>
            <div className={`emoji-mart-container ${positionEmojiMenuClassName}`}>
              <Picker showPreview={false} showSkinTones={false} emojiTooltip={true} onSelect={onEmojiSelect} />
            </div>
          </ClickOutsideWrapper>
        ))}

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
