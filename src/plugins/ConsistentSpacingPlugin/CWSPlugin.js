import { EditorState, Modifier, SelectionState } from 'draft-js';

//* INFO: When the ContentState is converted to HTML to be displayed in the view mode,
//* depending on the package used, empty unstyled blocks are converted to empty p tags
//* i.e. <p></p>. Most browsers ignore empty p and div tags during rendering which causes
//* the inconsistent line spacing.

// What this plugin essentially does is that it checks whether the block above the
// the current active block(block with the cursor) is empty or not. Incase the block
// is empty, then a single whitespace character is inserted into it.
const createCWSPlugin = () => {
  return {
    // TODO!: When a whitespace is inserted into an empty block, the cursor moves back
    //! one character position when text is inserted
    onChange: (editorState) => {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const lastEditedBlock = contentState.getBlockBefore(selectionState.getFocusKey());
      if (!lastEditedBlock || lastEditedBlock.getText().length > 0)
        return editorState;
      const selectionRange = SelectionState.createEmpty(lastEditedBlock.getKey());
      const updatedContentState = Modifier.insertText(contentState, selectionRange, ' ');
      return EditorState.set(editorState, {
        currentContent: updatedContentState,
      });
    }
  };
};

export default createCWSPlugin;
