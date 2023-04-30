import { Editor } from 'react-draft-wysiwyg';
import { PropTypes } from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.css';

// This editor is built using the more comprehensive react-draft-wysiwyg package.
// This sadly does not support plugins but we can still extend the default toolbar.
// This is here to explore the other viable solutions to the problems
// using the draftjs API - decorators, custom block rendering/components etc etc
// provided I've the time for it :)
function KbEditorReactDraft(props) {
  return (
    <>
      <Editor
        wrapperClassName='wrapper'
        editorClassName='wrapper__editor'
        toolbarClassName='toolbarClassName'
        {...props} />
    </>
  );
}

KbEditorReactDraft.propTypes = {
  readOnly: PropTypes.bool.required,
  editorState: PropTypes.object.required,
  setEditorState: PropTypes.func.required,
};

export default KbEditorReactDraft;
