import store from '../store';
import { getNotesRef } from '../../firebase/firebase.utils';

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

export const debounce = (fn, time) => {
  let timeout;
  let lastCall;

  return function (args) {
    let prevCall = lastCall;
    lastCall = Date.now();

    if (prevCall && (lastCall - prevCall < time)) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fn(args), time);
  }
};

export const updateFirebase = debounce(async () => {
  const currentUser = store.getState().user.currentUser;
  const notes = store.getState().notebook.notes;

  try {
    if (currentUser) {
      const notesRef = await getNotesRef(currentUser.id);
      await notesRef.update({ notesOfUser: notes });
      console.log('firebase updated!');
    }
  } catch (error) {
    console.log(error.message);
  }
}, 2000);