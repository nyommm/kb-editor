import { useRef } from 'react';
import { PropTypes } from 'prop-types';
import Editor from '@draft-js-plugins/editor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createCWSPlugin from '../plugins/ConsistentSpacingPlugin/CWSPlugin';
import createACPlugin from '../plugins/AnchorConverterPlugin/AnchorConverterPlugin';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import './editor.css';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

// Plugin to prevent inconistent line spacing between edit and view modes
const CWSPlugin = createCWSPlugin();
// Plugin to convert anchor tags to LINK entity permanently, losing the markup
const ACPlugin = createACPlugin();

// This editor is built using the vanilla draft-js-plugin editor
// The plugins are implemented for both the requirements :)
function KbEditorEditMode(props) {
  const editorRef = useRef();
  const handleFocus = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
  };
  return (
    <div className='wrapper__editor' onFocus={handleFocus}>
      <Editor
        ref={editorRef}
        plugins={[staticToolbarPlugin, ACPlugin, CWSPlugin]}
        readOnly={false}
        editorState={props.editorState}
        onChange={props.onEditorStateChange} />
      <Toolbar />
    </div>
  );
}

KbEditorEditMode.propTypes = {
  editorState: PropTypes.object,
  onEditorStateChange: PropTypes.func,
};

export default KbEditorEditMode;