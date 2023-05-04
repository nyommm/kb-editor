import { useRef } from 'react';
import { PropTypes } from 'prop-types';
import Editor from '@draft-js-plugins/editor';
// import '../components/editor.css';

function createPluginEditor(plugins, readOnly, toolbar) {
  const Toolbar = toolbar;
  // This editor is built using the vanilla draft-js-plugin editor
  // The plugins are implemented for both the requirements :)
  const PluginEditor = (props) => {
    const editorRef = useRef();
    const handleFocus = () => {
      if (!editorRef.current) return;
      editorRef.current.focus();
    };
    return (
      <div className='wrapper__editor' onFocus={handleFocus}>
        <Editor
          ref={editorRef}
          plugins={plugins}
          readOnly={readOnly}
          editorState={props.editorState}
          onChange={props.onEditorStateChange} />
        <Toolbar />
      </div>
    );
  };
  PluginEditor.propTypes = {
    editorState: PropTypes.object,
    onEditorStateChange: PropTypes.func,
  };
  return PluginEditor;
}

export default createPluginEditor;