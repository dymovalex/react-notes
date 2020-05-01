import React from 'react';

import Editor from '../../components/editor/editor.component';
import SideBar from '../../components/sidebar/sidebar.component';

import { debounce } from '../../components/note/note.utils';
import { getNotesRef } from '../../firebase/firebase.utils';

import './content.styles.scss';

class ContentComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			notes: [],
			selectedNoteIndex: null,
			notesRef: null,
			notesIsLoading: true,
			focusOnEditorOrTitleInput: false,
		};
	}

	async componentDidMount() {
		if (this.props.currentUser) {
			this.getNotesFromFirebase();
		} else {
			this.setState({
				notesIsLoading: false,
			})
		}
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.currentUser === null && this.props.currentUser) {
			this.getNotesFromFirebase();
			this.setState({
				notesIsLoading: true
			})
		} else if (prevProps.currentUser && this.props.currentUser === null) {
			this.clearState();
		}
	}

	clearState = () => {
		this.setState({
			notes: [],
			selectedNoteIndex: null,
			notesRef: null,
			notesIsLoading: false,
			focusOnEditorOrTitleInput: false,
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
			await this.state.notesRef.update({ notesOfUser: this.state.notes });
		}
	}, 2000);

	createNewNote = async (note) => {
		this.setState(state => ({
			notes: [note, ...state.notes]
		}));

		await this.updateFirebase();
	}

	selectCurrentNote = noteIndex => {
		if (noteIndex === this.state.selectedNoteIndex) {
			this.props.toggleSidebar();
		}
		this.setState(state => ({
			selectedNote: state.notes.filter((_, index) => index === noteIndex)[0],
			selectedNoteIndex: noteIndex
		}));
	}

	updateNoteText = async (text) => {
		this.setState(state => ({
			notes: [...state.notes.slice(0, state.selectedNoteIndex),
			{
				createAt: Date.now(),
				title: state.notes[state.selectedNoteIndex].title,
				text: text
			},
			...state.notes.slice(state.selectedNoteIndex + 1)]
		}));

		await this.updateFirebase();
	}

	updateNoteTitle = async (title) => {
		this.setState(state => ({
			notes: [...state.notes.slice(0, state.selectedNoteIndex),
			{
				createAt: Date.now(),
				title: title,
				text: state.notes[state.selectedNoteIndex].text
			},
			...state.notes.slice(state.selectedNoteIndex + 1)]
		}));

		await this.updateFirebase();
	}

	deleteNote = async (noteIndex) => {
		this.setState(state => ({
			notes: [...state.notes.slice(0, noteIndex),
			...state.notes.slice(noteIndex + 1)]
		}));

		await this.updateFirebase();
	};

	setFocusOnEditorOrTitleInput = (value) => {
		this.setState({
			focusOnEditorOrTitleInput: value
		});
	};

	render() {
		return (
			<div className='content'>
				<SideBar
					selectCurrentNote={this.selectCurrentNote}
					createNewNote={this.createNewNote}
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
					deleteNote={this.deleteNote}
					notesIsLoading={this.state.notesIsLoading}
					sidebarIsClosed={this.props.sidebarIsClosed}
					focusOnEditorOrTitleInput={this.state.focusOnEditorOrTitleInput}
				/>
				<Editor
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
					createNewNote={this.createNewNote}
					updateNoteTitle={this.updateNoteTitle}
					updateNoteText={this.updateNoteText}
					selectCurrentNote={this.selectCurrentNote}
					setFocusOnEditorOrTitleInput={this.setFocusOnEditorOrTitleInput}
				/>
			</div>
		);
	}
}

export default ContentComponent;