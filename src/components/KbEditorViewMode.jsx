import createCWSPlugin from '../plugins/ConsistentSpacingPlugin/CWSPlugin';
import createACPlugin from '../plugins/AnchorConverterPlugin/AnchorConverterPlugin';
import createADPlugin from '../plugins/AnchorDecoratorPlugin/AnchorDecoratorPlugin';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import './editor.css';
import createPluginEditor from '../utils/createPluginEditor';

// Plugin to prevent inconistent line spacing between edit and view modes
const CWSPlugin = createCWSPlugin();
// Plugin to render anchor tags as links in view mode without overwriting the HTML markup
const ADPlugin = createADPlugin();
// Plugin to convert anchor tags to LINK entity permanently, losing the markup
const ACPlugin = createACPlugin();

const KbEditorViewMode = createPluginEditor([ADPlugin, ACPlugin, CWSPlugin], true, () => {});

export default KbEditorViewMode;