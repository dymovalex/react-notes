export function removeTags(text) {
  return text.replace(/<[^>]*>?/gm, '');
};