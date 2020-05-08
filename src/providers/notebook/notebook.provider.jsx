import React, { useState, createContext, useContext, useEffect } from 'react';

import { UserContext } from '../user/user.provider';
import { SidebarContext } from '../sidebar/sidebar.provider';

import { getNotesRef } from '../../firebase/firebase.utils';

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

  useEffect(() => {
    const handler = setTimeout(() => {
      updateFirebase();
    }, 2000);
    return () => {
      clearTimeout(handler);
    };
  }, [notes]);

  const createNewNote = newNote => {
    setNotes([newNote, ...notes]);
    setAddingNote(false);
    setNewNoteTitle('');
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
  };

  const deleteNote = indexOfNoteToDelete => {
    setNotes(
      [...notes.slice(0, indexOfNoteToDelete),
      ...notes.slice(indexOfNoteToDelete + 1)]
    );
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

  const updateFirebase = async () => {
    try {
      if (currentUser) {
        const notesRef = await getNotesRef(currentUser.id);
        await notesRef.update({ notesOfUser: notes });
        console.log('firebase updated!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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