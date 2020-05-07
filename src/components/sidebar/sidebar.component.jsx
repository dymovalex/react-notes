import React, { useContext, useEffect } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import Note from '../note/note.component';
import Spinner from '../spinner/spinner.component';

import { NotebookContext } from '../../providers/notebook/notebook.provider';
import { SidebarContext } from '../../providers/sidebar/sidebar.provider';

import './sidebar.styles.scss';

const SideBar = () => {
	const {
		notes,
		addingNote,
		newNoteTitle,
		selectedNoteIndex,
		notesIsLoading,
		createNewNote,
		switchAddingNote,
		createNoteTitle,
		selectCurrentNote,
		deleteNote
	} = useContext(NotebookContext);

	const { sidebarIsClosed } = useContext(SidebarContext);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});

	const handleKeyDown = (e) => {
		if (e.target.className === 'ql-editor' || e.target.className === 'editor__title__input') {
			return;
		} else {
			switch (e.key) {
				case 'Enter':
					if (addingNote) {
						createNewNote({ title: newNoteTitle, text: '', createAt: Date.now() });
					} else {
						switchAddingNote();
					}
					break;

				case 'Escape':
					if (addingNote) {
						switchAddingNote();
					}
					break;

				case 'ArrowDown':
					if (selectedNoteIndex || selectedNoteIndex === 0) {
						if (selectedNoteIndex + 1 === notes.length) {
							selectCurrentNote(0);
						} else {
							selectCurrentNote(selectedNoteIndex + 1);
						}
					} else {
						selectCurrentNote(0);
					}
					break;
				case 'ArrowUp':
					if (selectedNoteIndex) {
						if (selectedNoteIndex === 0) {
							selectCurrentNote(notes.length - 1);
						} else {
							selectCurrentNote(selectedNoteIndex - 1);
						}
					} else {
						selectCurrentNote(notes.length - 1);
					}
					break;

				case 'Delete':
					if (selectedNoteIndex || selectedNoteIndex === 0) {
						deleteNote(selectedNoteIndex);
					}
					break;

				default:
					return null;
			}
		}
	}

	return (
		<div className={`sidebar ${sidebarIsClosed ? '' : 'open'}`}>
			{
				addingNote ?
					(<React.Fragment>
						<div className='input-container'>
							<input
								type='text'
								placeholder='Enter a note title'
								onChange={(e) => createNoteTitle(e.target.value)}
							>
							</input>
						</div>
						<div className='buttons-container'>
							<CustomButton cancel onClick={switchAddingNote}>
								<i className="fas fa-arrow-left"></i>
							</CustomButton>
							<CustomButton
								onClick={
									() => createNewNote({ title: newNoteTitle, text: '', createAt: Date.now() })
								}
							>
								submit
								</CustomButton>
						</div>
					</React.Fragment>)
					:
					(<div className='buttons-container'>
						<CustomButton onClick={switchAddingNote}>new note</CustomButton>
					</div>)
			}

			{notesIsLoading ?
				<Spinner /> :
				(<div className='notes-container'>
					{
						notes.map((note, index) => (
							<Note
								key={index}
								index={index}
								note={note}
								selected={selectedNoteIndex === index}
							/>
						))
					}
				</div>)
			}
		</div>
	);
}

export default SideBar;