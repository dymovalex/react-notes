import NotebookActionTypes from './notebook.types';
import { getNotesRef } from '../../firebase/firebase.utils';
import { debounce } from '../../components/note/note.utils';

export const createNewNote = note => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.CREATE_NEW_NOTE,
      payload: note
    });
    dispatch(updateFirebaseStartAsync());
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

export const selectCurrentNote = noteIndex => ({
  type: NotebookActionTypes.SELECT_CURRENT_NOTE,
  payload: noteIndex
});

export const deleteNote = noteIndex => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.DELETE_NOTE,
      payload: noteIndex
    });
    dispatch(updateFirebaseStartAsync());
  }
};

export const updateNoteTitle = title => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.UPDATE_NOTE_TITLE,
      payload: title
    });
    dispatch(updateFirebaseStartAsync());
  }
};

export const updateNoteText = text => {
  return dispatch => {
    dispatch({
      type: NotebookActionTypes.UPDATE_NOTE_TEXT,
      payload: text
    });
    dispatch(updateFirebaseStartAsync());
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
  payload: error.message
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

export const updateFirebaseStart = () => ({
  type: NotebookActionTypes.UPDATE_FIREBASE_START
});

export const updateFirebaseSuccess = () => ({
  type: NotebookActionTypes.UPDATE_FIREBASE_SUCCESS
});

export const updateFirebaseFailure = error => ({
  type: NotebookActionTypes.UPDATE_FIREBASE_FAILURE,
  payload: error.message
});

export const updateFirebaseStartAsync = () => {
  return async (dispatch, getState) => {
    dispatch(updateFirebaseStart());

    const currentUser = getState().user.currentUser;
    const notes = getState().notebook.notes;
    const update = debounce(async () => {

      try {
        if (currentUser) {
          const notesRef = await getNotesRef(currentUser.id);
          await notesRef.update({ notesOfUser: notes });
          dispatch(updateFirebaseSuccess());
        }
      } catch (error) {
        dispatch(updateFirebaseFailure(error));
      }
    }, 2000);

    await update();
  }
};