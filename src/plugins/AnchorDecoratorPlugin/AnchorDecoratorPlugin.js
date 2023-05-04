import ADComponent from "./ADComponent";
import { ANCHOR_REGEX } from "../../utils/anchor";

const anchorTagStrategy = (contentBlock, callback, contentState) => {
  if (!contentState) return;
  const text = contentBlock.getText();
  let matchGroups, start;
  while ((matchGroups = ANCHOR_REGEX.exec(text)) !== null) {
    start = matchGroups.index;
    callback(start, start + matchGroups[0].length);
  }
}

//* INFO: This is one of the solutions to preserve hyperlinks.
/* The plugin checks all blocks for the presence of an "valid" anchor tag,
and once the user is done editing the block containing the link it renders
it as a link. The HTML markup is still preserved and the user can edit it
 again in the edit mode. */
const createADPlugin = () => {
  return {
    decorators: [
      {
        strategy: anchorTagStrategy,
        component: ADComponent,
      },
    ],
  };
}

export default createADPlugin;