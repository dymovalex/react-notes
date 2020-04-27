import React from 'react';

import Editor from '../../components/editor/editor.component';
import SideBarComponent from '../../components/sidebar/sidebar.component';

import { debounce, setNotesInLocalStorage } from '../../components/note/note.utils';
import { getNotesRef } from '../../firebase/firebase.utils';

import './content.styles.scss';

class ContentComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: /*JSON.parse(localStorage.getItem('notes')) ||*/[],
			selectedNoteIndex: null,
			notesRef: null,
			notesIsLoading: true,
		};
	}

	async componentDidMount() {
		if (this.props.currentUser) {
			this.getNotesFromFirebase();
		} else {
			this.setState({
				notesIsLoading: false,
			});
		}
	}

	async componentDidUpdate(prevProps) {
		if ((prevProps.currentUser === null && this.props.currentUser)) {
			this.getNotesFromFirebase();
		}
		if (prevProps.currentUser && this.props.currentUser === null) {
			this.clearState();
		}
	}

	clearState = () => {
		this.setState({
			notes: /*JSON.parse(localStorage.getItem('notes')) ||*/[],
			selectedNoteIndex: null,
			notesRef: null,
			notesIsLoading: false,
		});
	};

	getNotesFromFirebase = async () => {
		const notesRef = await getNotesRef(this.props.currentUser.id);
		const notesSnapshot = await notesRef.get();
		this.setState({
			notes: notesSnapshot.data().notesOfUser,
			notesRef,
			notesIsLoading: false,
		});
	}

	updateFirebase = debounce(async () => {
		if (this.props.currentUser) {
			console.log('UPDATED!');
			await this.state.notesRef.update({ notesOfUser: this.state.notes });
		}
	}, 2000);

	createNewNote = async (note) => {
		this.setState({
			notes: [note, ...this.state.notes]
		}/*, () => setNotesInLocalStorage(this.state.notes)*/);

		await this.updateFirebase();
	}

	selectCurrentNote = noteIndex => {
		this.setState({
			selectedNote: this.state.notes.filter((_, index) => index === noteIndex)[0],
			selectedNoteIndex: noteIndex
		});
	}

	updateNoteText = async (text) => {
		this.setState({
			notes: [...this.state.notes.slice(0, this.state.selectedNoteIndex),
			{
				createAt: Date.now(),
				title: this.state.notes[this.state.selectedNoteIndex].title,
				text: text
			},
			...this.state.notes.slice(this.state.selectedNoteIndex + 1)]
		}/*, () => setNotesInLocalStorage(this.state.notes)*/);

		await this.updateFirebase();
	}

	updateNoteTitle = async (title) => {
		this.setState({
			notes: [...this.state.notes.slice(0, this.state.selectedNoteIndex),
			{
				createAt: Date.now(),
				title: title,
				text: this.state.notes[this.state.selectedNoteIndex].text
			},
			...this.state.notes.slice(this.state.selectedNoteIndex + 1)]
		}/*, () => setNotesInLocalStorage(this.state.notes)*/);

		await this.updateFirebase();
	}

	deleteNote = async (noteIndex) => {
		this.setState({
			notes: [...this.state.notes.slice(0, noteIndex),
			...this.state.notes.slice(noteIndex + 1)]
		}/*, () => setNotesInLocalStorage(this.state.notes)*/);

		await this.updateFirebase();
	};

	clearNotes = () => {
		this.setState({
			notes: []
		});
	}

	render() {
		return (
			<div className='content'>
				<SideBarComponent
					selectCurrentNote={this.selectCurrentNote}
					createNewNote={this.createNewNote}
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
					deleteNote={this.deleteNote}
					notesIsLoading={this.state.notesIsLoading}
				/>
				<Editor
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
					createNewNote={this.createNewNote}
					updateNoteTitle={this.updateNoteTitle}
					updateNoteText={this.updateNoteText}
					selectCurrentNote={this.selectCurrentNote}
				/>
			</div>
		);
	}
}

export default ContentComponent;