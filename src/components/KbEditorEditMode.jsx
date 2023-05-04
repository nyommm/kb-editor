import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createCWSPlugin from '../plugins/ConsistentSpacingPlugin/CWSPlugin';
import createACPlugin from '../plugins/AnchorConverterPlugin/AnchorConverterPlugin';
import createPluginEditor from '../utils/createPluginEditor';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import './editor.css';

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

// Plugin to prevent inconistent line spacing between edit and view modes
const CWSPlugin = createCWSPlugin();
// Plugin to convert anchor tags to LINK entity permanently, losing the markup
const ACPlugin = createACPlugin();

const KbEditorEditMode = createPluginEditor([staticToolbarPlugin, ACPlugin, CWSPlugin], true, Toolbar);

export default KbEditorEditMode;