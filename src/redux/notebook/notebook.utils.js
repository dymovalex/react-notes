export const createNewNote = (notes, newNote) => {
  return [newNote, ...notes];
};

export const createNoteTitle = (title) => {
  return title;
};

export const deleteNote = (notes, indexOfNoteToDelete) => {
  return [...notes.slice(0, indexOfNoteToDelete),
  ...notes.slice(indexOfNoteToDelete + 1)];
};

export const updateNoteTitle = (notes, selectedNoteIndex, title) => {
  return [...notes.slice(0, selectedNoteIndex),
  {
    createAt: Date.now(),
    title,
    text: notes[selectedNoteIndex].text
  },
  ...notes.slice(selectedNoteIndex + 1)];
};

export const updateNoteText = (notes, selectedNoteIndex, text) => {
  return [...notes.slice(0, selectedNoteIndex),
  {
    createAt: Date.now(),
    title: notes[selectedNoteIndex].title,
    text
  },
  ...notes.slice(selectedNoteIndex + 1)];
};