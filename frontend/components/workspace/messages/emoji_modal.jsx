import React from 'react';
import Modal from 'react-modal';
import { Picker } from 'emoji-mart';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#root');

export function EmojiModal(props) {
  const { openEmojiMenu, closeEmojiMenu, onEmojiSelect, position } = props;
  console.log('POSITION', position);
  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    content: {
      top: position.top,
      right: position.right,
      bottom: position.bottom,
      left: position.left,
      marginRight: position.marginRight,
      transform: position.transform || 'translate(-50%, -50%)',
      padding: 0,
      border: 'none',
      position: 'fixed',
    },
  };

  return (
    <div>
      <Modal isOpen={openEmojiMenu} onRequestClose={closeEmojiMenu} style={customStyles} contentLabel="Select an Emoji">
        <Picker emojiTooltip={true} onSelect={onEmojiSelect} />
      </Modal>
    </div>
  );
}
