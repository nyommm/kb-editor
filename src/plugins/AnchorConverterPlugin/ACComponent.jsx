import PropTypes from 'prop-types';

export default function ACComponent(props) {
  const editorState = props.getEditorState();
  const entity = editorState.getCurrentContent().getEntity(props.entityKey);
  const entityData = entity ? entity.getData() : undefined;
  const url = (entityData && entityData.url) || undefined;
  return (
    <a href={url} rel="external noreferrer" target="_blank">
      {props.children}
    </a>
  );
}

ACComponent.propTypes = {
  entityKey: PropTypes.string,
  getEditorState: PropTypes.func,
  children: PropTypes.array,
};