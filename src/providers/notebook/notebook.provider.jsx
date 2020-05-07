import React, { useState, createContext, useContext } from 'react';

import { UserContext } from '../user/user.provider';
import { SidebarContext } from '../sidebar/sidebar.provider';

import { getNotesRef } from '../../firebase/firebase.utils';
import { debounce } from './notebook.utils';

export const NotebookContext = createContext();

const NotebookProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);
  const [editingNoteTitle, setEditingNoteTitle] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [notesIsLoading, setNotesIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const createNewNote = newNote => {
    setNotes([newNote, ...notes]);
    setAddingNote(false);
    setNewNoteTitle('');
    updateFirebase();
  };

  const updateNoteTitle = title => {
    setNotes(
      [...notes.slice(0, selectedNoteIndex),
      {
        createAt: Date.now(),
        title,
        text: notes[selectedNoteIndex].text
      },
      ...notes.slice(selectedNoteIndex + 1)]
    );
    updateFirebase();
  };

  const updateNoteText = text => {
    setNotes(
      [...notes.slice(0, selectedNoteIndex),
      {
        createAt: Date.now(),
        title: notes[selectedNoteIndex].title,
        text
      },
      ...notes.slice(selectedNoteIndex + 1)]
    );
    updateFirebase();
  };

  const deleteNote = indexOfNoteToDelete => {
    setNotes(
      [...notes.slice(0, indexOfNoteToDelete),
      ...notes.slice(indexOfNoteToDelete + 1)]
    );
    updateFirebase();
  };

  const selectCurrentNote = noteIndex => {
    if (noteIndex === selectedNoteIndex) {
      toggleSidebar();
    }
    setSelectedNoteIndex(noteIndex);
  };

  const createNoteTitle = title => {
    setNewNoteTitle(title);
  };

  const switchAddingNote = () => {
    setAddingNote(!addingNote)
  };

  const switchEditingNoteTitle = () => {
    setEditingNoteTitle(!editingNoteTitle)
  };

  const fetchNotesFromFirebase = async currentUser => {
    setNotesIsLoading(true);

    try {
      const notesRef = await getNotesRef(currentUser.id);
      const notesSnapshot = await notesRef.get();
      setNotes(notesSnapshot.data().notesOfUser);
      setNotesIsLoading(false);
    } catch (error) {
      setNotesIsLoading(false);
      console.log(error);
    }
  };

  const updateFirebase = debounce(async () => {
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

  return (
    <NotebookContext.Provider
      value={{
        notes,
        addingNote,
        editingNoteTitle,
        newNoteTitle,
        selectedNoteIndex,
        notesIsLoading,
        createNewNote,
        updateNoteTitle,
        updateNoteText,
        deleteNote,
        selectCurrentNote,
        createNoteTitle,
        switchAddingNote,
        switchEditingNoteTitle,
        fetchNotesFromFirebase,
      }}
    >
      {children}
    </NotebookContext.Provider>
  )
};

export default NotebookProvider;