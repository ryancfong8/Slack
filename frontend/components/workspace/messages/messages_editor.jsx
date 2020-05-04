import React, { Component } from 'react';
import { EditorState, convertToRaw, getDefaultKeyBinding, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { getChannelName } from '../../util/utils';

const MESSAGE__CREATE = 'Message.create';
const MESSAGE__UPDATE = 'Message.update';

class MessagesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      hasError: false,
      disabled: false,
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.keyBindingFn = this.keyBindingFn.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount() {
    const { message } = this.props;
    if (message) {
      const blocksFromHtml = htmlToDraft(message.body);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState: EditorState.moveFocusToEnd(editorState),
      });
    }
  }

  // detect keyCodes and send to handleKeyCommand
  keyBindingFn(e) {
    const { disabled, hasError } = this.state;
    const { editMode } = this.props;
    // prevent line breaks if enter key is pressed and text is empty
    // if (e.keyCode === 13 && !e.shiftKey && !disabled && !hasError) {
    //   return this.handleKeyCommand('edit');
    // }
    if (e.keyCode === 13 && !e.shiftKey && !disabled) {
      if (editMode) return this.handleKeyCommand('edit');
      return this.handleKeyCommand('submit');
    }
    // prevent hitting enter key to create line breaks if there is an error
    if (e.keyCode === 13 && !e.shiftKey) {
      return;
    }
    return getDefaultKeyBinding(e);
  }

  // handle command from keyBindingFn
  handleKeyCommand(command) {
    let result;
    switch (command) {
      case 'submit':
        this.messageAction(MESSAGE__CREATE);
        result = 'handled';
        break;
      case 'edit':
        this.messageAction(MESSAGE__UPDATE);
        result = 'handled';
        break;
    }
    return result;
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  async messageAction(action) {
    const { editorState } = this.state;
    const { createMessage, updateMessage, currentUser, currentChannel, message, setShowEdit } = this.props;
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    let htmlString = draftToHtml(rawContentState);
    // remove the extra paragraph from the enter
    if (htmlString.slice(htmlString.length - 7, htmlString.length) === '<p></p>') {
      htmlString = htmlString.slice(0, htmlString.length - 7);
    }
    const newMessage = message
      ? Object.assign(message, {
          body: htmlString,
        })
      : {
          body: htmlString,
          user_id: currentUser.id,
          channel_id: currentChannel.id,
        };
    if (action === MESSAGE__UPDATE) {
      await updateMessage(newMessage);
      setShowEdit(false);
    } else {
      await createMessage(newMessage);
      this.setState({
        editorState: EditorState.moveFocusToEnd(EditorState.createEmpty()),
        hasError: false,
        disabled: false,
      });
    }
  }

  render() {
    const { editorState } = this.state;
    const { message, setShowEdit, currentChannel, currentUser } = this.props;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          toolbarClassName="editor-toolbar"
          onEditorStateChange={this.onEditorStateChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          toolbar={toolbarOptions}
          placeholder={`Message ${getChannelName(currentChannel, currentUser.id)}`}
        />
        {message && (
          <div className="d-flex flex-row mt-2 mb-2">
            <button
              className="btn cancel-btn mr-3"
              onClick={(e) => {
                e.preventDefault();
                setShowEdit(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary submit-btn"
              onClick={(e) => {
                e.preventDefault();
                this.messageAction(MESSAGE__UPDATE);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default MessagesEditor;

const toolbarOptions = {
  options: [
    'inline',
    'list',
    // 'link',
    'emoji',
    // 'image',
  ],
  inline: {
    // inDropdown: false,
    // className: undefined,
    // component: undefined,
    // dropdownClassName: undefined,
    options: ['bold', 'italic', 'strikethrough', 'monospace'],
    //   bold: { icon: bold, className: undefined },
    //   italic: { icon: italic, className: undefined },
    //   strikethrough: { icon: strikethrough, className: undefined }
  },
  list: {
    // inDropdown: false,
    // className: undefined,
    // component: undefined,
    // dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
    //   unordered: { icon: unordered, className: undefined },
    //   ordered: { icon: ordered, className: undefined }
  },
  //   link: {
  //     inDropdown: false,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     dropdownClassName: undefined,
  //     showOpenOptionOnHover: true,
  //     defaultTargetOption: '_self',
  //     options: ['link', 'unlink'],
  //     link: { icon: link, className: undefined },
  //     unlink: { icon: unlink, className: undefined },
  //     linkCallback: undefined
  //   },
  //   emoji: {
  //     icon: emoji,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     emojis: [
  //       '😀',
  //       '😁',
  //       '😂',
  //       '😃',
  //       '😉',
  //       '😋',
  //       '😎',
  //       '😍',
  //       '😗',
  //       '🤗',
  //       '🤔',
  //       '😣',
  //       '😫',
  //       '😴',
  //       '😌',
  //       '🤓',
  //       '😛',
  //       '😜',
  //       '😠',
  //       '😇',
  //       '😷',
  //       '😈',
  //       '👻',
  //       '😺',
  //       '😸',
  //       '😹',
  //       '😻',
  //       '😼',
  //       '😽',
  //       '🙀',
  //       '🙈',
  //       '🙉',
  //       '🙊',
  //       '👼',
  //       '👮',
  //       '🕵',
  //       '💂',
  //       '👳',
  //       '🎅',
  //       '👸',
  //       '👰',
  //       '👲',
  //       '🙍',
  //       '🙇',
  //       '🚶',
  //       '🏃',
  //       '💃',
  //       '⛷',
  //       '🏂',
  //       '🏌',
  //       '🏄',
  //       '🚣',
  //       '🏊',
  //       '⛹',
  //       '🏋',
  //       '🚴',
  //       '👫',
  //       '💪',
  //       '👈',
  //       '👉',
  //       '👉',
  //       '👆',
  //       '🖕',
  //       '👇',
  //       '🖖',
  //       '🤘',
  //       '🖐',
  //       '👌',
  //       '👍',
  //       '👎',
  //       '✊',
  //       '👊',
  //       '👏',
  //       '🙌',
  //       '🙏',
  //       '🐵',
  //       '🐶',
  //       '🐇',
  //       '🐥',
  //       '🐸',
  //       '🐌',
  //       '🐛',
  //       '🐜',
  //       '🐝',
  //       '🍉',
  //       '🍄',
  //       '🍔',
  //       '🍤',
  //       '🍨',
  //       '🍪',
  //       '🎂',
  //       '🍰',
  //       '🍾',
  //       '🍷',
  //       '🍸',
  //       '🍺',
  //       '🌍',
  //       '🚑',
  //       '⏰',
  //       '🌙',
  //       '🌝',
  //       '🌞',
  //       '⭐',
  //       '🌟',
  //       '🌠',
  //       '🌨',
  //       '🌩',
  //       '⛄',
  //       '🔥',
  //       '🎄',
  //       '🎈',
  //       '🎉',
  //       '🎊',
  //       '🎁',
  //       '🎗',
  //       '🏀',
  //       '🏈',
  //       '🎲',
  //       '🔇',
  //       '🔈',
  //       '📣',
  //       '🔔',
  //       '🎵',
  //       '🎷',
  //       '💰',
  //       '🖊',
  //       '📅',
  //       '✅',
  //       '❎',
  //       '💯'
  //     ]
  //   },
  //   embedded: {
  //     icon: embedded,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     embedCallback: undefined,
  //     defaultSize: {
  //       height: 'auto',
  //       width: 'auto'
  //     }
  //   }
  //   image: {
  //     icon: image,
  //     className: undefined,
  //     component: undefined,
  //     popupClassName: undefined,
  //     urlEnabled: true,
  //     uploadEnabled: true,
  //     alignmentEnabled: true,
  //     uploadCallback: undefined,
  //     previewImage: false,
  //     inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
  //     alt: { present: false, mandatory: false },
  //     defaultSize: {
  //       height: 'auto',
  //       width: 'auto'
  //     }
  //   }
};
