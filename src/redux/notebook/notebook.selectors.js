import { createSelector } from 'reselect';

const selectNotebook = state => state.notebook;

export const selectNotebookNotes = createSelector(
  [selectNotebook],
  (notebook) => notebook.notes
);

export const selectNotebookAddingNote = createSelector(
  [selectNotebook],
  (notebook) => notebook.addingNote
);

export const selectNotebookEditingNoteTitle = createSelector(
  [selectNotebook],
  (notebook) => notebook.editingNoteTitle
);

export const selectNotebookNewNoteTitle = createSelector(
  [selectNotebook],
  (notebook) => notebook.newNoteTitle
);

export const selectNotebookSelectedNoteIndex = createSelector(
  [selectNotebook],
  (notebook) => notebook.selectedNoteIndex
);

export const selectNotebookNotesIsLoading = createSelector(
  [selectNotebook],
  (notebook) => notebook.notesIsLoading
);