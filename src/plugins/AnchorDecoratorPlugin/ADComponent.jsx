import PropTypes from 'prop-types';
import { extractLinkAndText } from '../../utils/anchor';

export default function ADComponent(props) {
  const { decoratedText } = props;
  const { url, text } = extractLinkAndText(decoratedText);
  if (!url || !text) {
    return (
      <span>
        {props.children}
      </span>
    );
  }
  return (
    <a href={`${url}`} rel="external noreferrer" target="_blank">
      {text}
    </a>
  );
}

ADComponent.propTypes = {
  getEditorState: PropTypes.func,
  blockKey: PropTypes.string,
  decoratedText: PropTypes.string,
  children: PropTypes.array,
};