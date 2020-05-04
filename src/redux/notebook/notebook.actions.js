import NotebookActionTypes from './notebook.types';

export const createNewNote = note => ({
  type: NotebookActionTypes.CREATE_NEW_NOTE,
  payload: note
});

export const switchAddingNote = () => ({
  type: NotebookActionTypes.SWITCH_ADDING_NOTE
});

export const editNoteTitle = title => ({
  type: NotebookActionTypes.EDIT_NOTE_TITLE,
  payload: title
});

export const selectCurrentNote = noteIndex => ({
  type: NotebookActionTypes.SELECT_CURRENT_NOTE,
  payload: noteIndex
});

export const deleteNote = noteIndex => ({
  type: NotebookActionTypes.DELETE_NOTE,
  payload: noteIndex
});

export const updateNoteTitle = title => ({
  type: NotebookActionTypes.UPDATE_NOTE_TITLE,
  payload: title
});

export const updateNoteText = text => ({
  type: NotebookActionTypes.UPDATE_NOTE_TEXT,
  payload: text
});