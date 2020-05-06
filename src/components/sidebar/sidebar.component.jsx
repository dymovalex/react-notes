import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';
import Note from '../note/note.component';
import Spinner from '../spinner/spinner.component';

import './sidebar.styles.scss';

import {
	createNewNote,
	switchAddingNote,
	editNoteTitle,
	selectCurrentNote,
	deleteNote
} from '../../redux/notebook/notebook.actions';

import {
	selectNotebookNotes,
	selectNotebookAddingNote,
	selectNotebookNewNoteTitle,
	selectNotebookSelectedNoteIndex,
	selectNotebookNotesIsLoading
} from '../../redux/notebook/notebook.selectors';
import { selectSidebarIsClosed } from '../../redux/sidebar/sidebar.selectors';

class SideBarComponent extends React.Component {
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		if (e.target.className === 'ql-editor' || e.target.className === 'editor__title__input') {
			return;
		} else {
			const { notes,
				createNewNote,
				selectedNoteIndex,
				deleteNote,
				addingNote,
				switchAddingNote,
				selectCurrentNote,
				newNoteTitle } = this.props;

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

	render() {
		const {
			notes,
			selectedNoteIndex,
			createNewNote,
			addingNote,
			switchAddingNote,
			newNoteTitle,
			notesIsLoading,
			editNoteTitle,
			sidebarIsClosed } = this.props;

		return (
			<div className={`sidebar ${sidebarIsClosed ? '' : 'open'}`}>
				{
					addingNote ?
						(<React.Fragment>
							<div className='input-container'>
								<input
									type='text'
									placeholder='Enter a note title'
									onChange={(e) => editNoteTitle(e.target.value)}
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
}

const mapStateToProps = createStructuredSelector({
	notes: selectNotebookNotes,
	addingNote: selectNotebookAddingNote,
	newNoteTitle: selectNotebookNewNoteTitle,
	selectedNoteIndex: selectNotebookSelectedNoteIndex,
	sidebarIsClosed: selectSidebarIsClosed,
	notesIsLoading: selectNotebookNotesIsLoading,
});

const mapDispatchToProps = dispatch => ({
	createNewNote: note => dispatch(createNewNote(note)),
	switchAddingNote: () => dispatch(switchAddingNote()),
	editNoteTitle: title => dispatch(editNoteTitle(title)),
	selectCurrentNote: noteIndex => dispatch(selectCurrentNote(noteIndex)),
	deleteNote: noteIndex => dispatch(deleteNote(noteIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);