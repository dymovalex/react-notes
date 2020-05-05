import NotebookActionTypes from './notebook.types';
import {
  createNewNote,
  createNoteTitle,
  deleteNote,
  updateNoteTitle,
  updateNoteText
} from './notebook.utils';

const INITIAL_STATE = {
  notes: [],
  addingNote: false,
  editingNoteTitle: false,
  newNoteTitle: '',
  selectedNoteIndex: null,
  notesIsLoading: false,
  errorMessage: '',
};

const notebookReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotebookActionTypes.CREATE_NEW_NOTE:
      return {
        ...state,
        notes: createNewNote(state.notes, action.payload),
        addingNote: false,
        newNoteTitle: '',
      };

    case NotebookActionTypes.SWITCH_ADDING_NOTE:
      return {
        ...state,
        addingNote: !state.addingNote
      };

    case NotebookActionTypes.SWITCH_EDITING_NOTE_TITLE:
      return {
        ...state,
        editingNoteTitle: !state.editingNoteTitle
      };

    case NotebookActionTypes.EDIT_NOTE_TITLE:
      return {
        ...state,
        newNoteTitle: createNoteTitle(action.payload)
      };

    case NotebookActionTypes.SELECT_CURRENT_NOTE:
      return {
        ...state,
        selectedNoteIndex: action.payload,
      };

    case NotebookActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: deleteNote(state.notes, action.payload)
      };

    case NotebookActionTypes.UPDATE_NOTE_TITLE:
      return {
        ...state,
        notes: updateNoteTitle(state.notes, state.selectedNoteIndex, action.payload)
      };

    case NotebookActionTypes.UPDATE_NOTE_TEXT:
      return {
        ...state,
        notes: updateNoteText(state.notes, state.selectedNoteIndex, action.payload)
      };

    case NotebookActionTypes.FETCH_NOTES_START:
      return {
        ...state,
        notesIsLoading: true
      };

    case NotebookActionTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        notesIsLoading: false
      };

    case NotebookActionTypes.FETCH_NOTES_FAILURE:
      return {
        ...state,
        notesIsLoading: false,
        errorMessage: action.payload
      };

    case NotebookActionTypes.UPDATE_FIREBASE_START:
    case NotebookActionTypes.UPDATE_FIREBASE_SUCCESS:
      return {
        ...state
      };

    case NotebookActionTypes.UPDATE_FIREBASE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
}

export default notebookReducer;