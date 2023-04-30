import { EditorState, Modifier } from 'draft-js';
import { extractLinkAndText } from '../../utils/anchor';
import ACComponent from './ACComponent';

function linkStrategy(contentBlock, callback, contentState) {
  if (!contentState) return;
  contentBlock.findEntityRanges((char) => {
    const entityKey = char.getEntity();
    return (entityKey !== null
            && contentState.getEntity(entityKey).getType() == 'LINK');
  }, callback);
}

//* INFO: This is one of the plugins to preserve hyperlinks.
//* When a user selects a range of text that represents a valid HTML
//* anchor tag and presses CTRL + ALT + L, the anchor tag is permanently
//* converted to a LINK entity and is appropriately decorated.
//* The input required for the conversion can also be easily extented to a button press
//* on existing toolbars available for the editor.
const createACPlugin = () => {
  return {
    keyBindingFn: (evt) => {
      //* INFO: Select text containing the anchor tag and press Ctrl + Alt + L
      if (evt.ctrlKey && evt.altKey && evt.key == 'l') {
        return 'convert-anchor';
      }
    },
    handleKeyCommand: (command, editorState, _, { setEditorState }) => {
      if (command == 'convert-anchor') {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentBlock = contentState.getBlockForKey(anchorKey);
        const selectionStart = selectionState.getStartOffset();
        const selectionEnd = selectionState.getEndOffset();
        //* INFO: This only works when the selection is limited to one block
        const selectedText = currentBlock.getText().slice(selectionStart, selectionEnd);
        //* INFO: The method bellow expects selectedText to just contain the anchor tag.
        //* It should be possible to convert one or more anchor tags within the selected range,
        //* but it would be a complex operation as we'll need keep track of selection range
        //* as it will change as we replace anchor tags with their corresponding text.
        //* For now we only update if the selection is just one valid anchor tag.
        const { url, text } = extractLinkAndText(selectedText);
        if (!url || !text) return true;
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const contentStateWithReplacedAnchor = Modifier.replaceText(
          contentState,
          selectionState,
          text,
          {},
          entityKey
        );
        setEditorState(EditorState.set(editorState, {
          currentContent: contentStateWithReplacedAnchor
        }));
        return true;
      }
    },
    decorators: [
      {
        strategy: linkStrategy,
        component: ACComponent,
      },
    ],
  };
}

export default createACPlugin;