import NotebookActionTypes from './notebook.types';
import { toggleSidebar } from '../sidebar/sidebar.actions';
import { updateFirebase } from './notebook.utils';
import { getNotesRef } from '../../firebase/firebase.utils';

export const createNewNote = note => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.CREATE_NEW_NOTE,
      payload: note
    });

    updateFirebase();
  }
};

export const switchAddingNote = () => ({
  type: NotebookActionTypes.SWITCH_ADDING_NOTE
});

export const switchEditingNoteTitle = () => ({
  type: NotebookActionTypes.SWITCH_EDITING_NOTE_TITLE
});

export const editNoteTitle = title => ({
  type: NotebookActionTypes.EDIT_NOTE_TITLE,
  payload: title
});

export const selectCurrentNote = noteIndex => {
  return (dispatch, getState) => {
    const selectedNoteIndex = getState().notebook.selectedNoteIndex;
    if (noteIndex === selectedNoteIndex) {
      dispatch(toggleSidebar());
    }

    dispatch({
      type: NotebookActionTypes.SELECT_CURRENT_NOTE,
      payload: noteIndex
    });
  };
};

export const deleteNote = noteIndex => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.DELETE_NOTE,
      payload: noteIndex
    });

    updateFirebase();
  }
};

export const updateNoteTitle = title => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.UPDATE_NOTE_TITLE,
      payload: title
    });

    updateFirebase();
  }
};

export const updateNoteText = text => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.UPDATE_NOTE_TEXT,
      payload: text
    });

    updateFirebase();
  }
};

export const fetchNotesStart = () => ({
  type: NotebookActionTypes.FETCH_NOTES_START
});

export const fetchNotesSuccess = notes => ({
  type: NotebookActionTypes.FETCH_NOTES_SUCCESS,
  payload: notes
});

export const fetchNotesFailure = error => ({
  type: NotebookActionTypes.FETCH_NOTES_FAILURE,
  payload: error
});

export const fetchNotesStartAsync = currentUser => {
  return async dispatch => {
    dispatch(fetchNotesStart());

    try {
      const notesRef = await getNotesRef(currentUser.id);
      const notesSnapshot = await notesRef.get();
      dispatch(fetchNotesSuccess(notesSnapshot.data().notesOfUser));
    } catch (error) {
      dispatch(fetchNotesFailure(error));
    }
  }
};