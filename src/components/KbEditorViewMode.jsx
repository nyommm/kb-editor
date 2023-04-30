import { useRef } from 'react';
import { PropTypes } from 'prop-types';
import Editor from '@draft-js-plugins/editor';
import createCWSPlugin from '../plugins/ConsistentSpacingPlugin/CWSPlugin';
import createACPlugin from '../plugins/AnchorConverterPlugin/AnchorConverterPlugin';
import createADPlugin from '../plugins/AnchorDecoratorPlugin/AnchorDecoratorPlugin';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import './editor.css';

// Plugin to prevent inconistent line spacing between edit and view modes
const CWSPlugin = createCWSPlugin();
// Plugin to render anchor tags as links in view mode without overwriting the HTML markup
const ADPlugin = createADPlugin();
// Plugin to convert anchor tags to LINK entity permanently, losing the markup
const ACPlugin = createACPlugin();

// This editor is built using the vanilla draft-js-plugin editor
// The plugins are implemented for both the requirements :)
function KbEditorViewMode(props) {
  const editorRef = useRef();
  const handleFocus = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
  };
  return (
    <div className='wrapper__editor' onFocus={handleFocus}>
      <Editor
        ref={editorRef}
        readOnly={true}
        plugins={[ACPlugin, ADPlugin, CWSPlugin]}
        editorState={props.editorState}
        onChange={props.onEditorStateChange} />
    </div>
  );
}

KbEditorViewMode.propTypes = {
  editorState: PropTypes.object,
  onEditorStateChange: PropTypes.func,
};

export default KbEditorViewMode;