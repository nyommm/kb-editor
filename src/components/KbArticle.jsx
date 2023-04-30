import { useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import './editor.css';

// This component renders the ContentState of the draftjs editor
// after the Save btn is pressed. ContentState is first converted to
// valid HTML markup using the draftjs-to-html package
function KbArticle({ HTMLContent }) {
  const articleRef = useRef();
  useEffect(() => {
    if (!articleRef.current) return;
    articleRef.current.innerHTML = HTMLContent;
  }, [HTMLContent]);
  return (
    <div ref={articleRef} className='article'>
    </div>
  );
}

KbArticle.propTypes = {
  HTMLContent: PropTypes.string,
};

export default KbArticle;

//* NOTE: There are other packages (e.g. draft-js-export-html) that can also be utilized
//* for this conversion that handle empty blocks by inserting a <br/>
//* tag which will result in consistent formating of empty lines/blocks out-of-the-box

//* NOTE: Why not just use the draftjs editor to display the article too as it can be disabled?
//* Simpler to just always let the draftjs editor to display/covert the ContentState to HTML -_-
