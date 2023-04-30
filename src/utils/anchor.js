const URL_REGEX = /href="([^?#]*)"/;

export const ANCHOR_REGEX = /<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/g;

export function extractLinkAndText(anchorTagAsString) {
  const match = ANCHOR_REGEX.exec(anchorTagAsString);
  if (!match || match.index != 0 || match[0].length != anchorTagAsString.length)
    return { url: null, text: null };
  const urlMatch = URL_REGEX.exec(match[1]);
  return {
    url: urlMatch ? urlMatch[1] : null,
    text: match[2],
  };
}