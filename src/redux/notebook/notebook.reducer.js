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
  newNoteTitle: '',
  selectedNoteIndex: null,
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

    default:
      return state;
  }
}

export default notebookReducer;