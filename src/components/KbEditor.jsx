import { useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHTML from 'draftjs-to-html';
import { PropTypes } from 'prop-types';
import KbEditorEditMode from './KbEditorEditMode';
import KbEditorViewMode from './KbEditorViewMode';
import './editor.css';

const INTIAL_RAW_CONTENT = {
  "blocks":[{"key":"1pf7s","text":"Readyly","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":7,"key":0}],"data":{}},{"key":"dv6d6","text":"some text <a href=\"https://readyly.com\">Readyly</a>","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cipgb","text":"Try Readyly","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":11,"key":1}],"data":{}},{"key":"ekqad","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"89q8g","text":"line1","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c37ca","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4479b","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"38cid","text":"line3","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://readyly.com"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://readyly.com"}}}
};

// This component acts as a wrapper for the editor and the edit/save btn
function KbEditor({ updateArticle }) {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(INTIAL_RAW_CONTENT)));
  const [editing, setEditing] = useState(false);
  const handleBtnClick = () => {
    if (editing) {
      const contentState = convertToRaw(editorState.getCurrentContent());
      //* We can insert whitespace into empty blocks once before
      //* the conversion to prevent inconsistent line spacing
      // for (const block of contentState.blocks)
      //   if (block.text.length == 0) block.text = " ";
      updateArticle(draftToHTML(contentState));
    }
    setEditing(!editing);
  };
  return (
    // You can just use any of the two editors here.
    // To switch between the two just change the component name.
    <div className="editor-container">
      {editing
        ? (<KbEditorEditMode
          editorState={editorState}
          onEditorStateChange={(state) => setEditorState(state)} />)
        : (<KbEditorViewMode
          editorState={editorState}
          onEditorStateChange={(state) => setEditorState(state)} />)}
      <span className='btn-container'>
        <button className='btn-container__btn' onClick={handleBtnClick}>
          {editing ? 'Save' : 'Edit'}
        </button>
      </span>
    </div>
  );
}

KbEditor.propTypes = {
  updateArticle: PropTypes.func,
};

export default KbEditor;
