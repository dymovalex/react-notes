export const removeTags = text => {
  return text.replace(/<[^>]*>?/gm, '');
};