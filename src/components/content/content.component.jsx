import React from 'react';

import Editor from '../../components/editor/editor.component';
import SideBarComponent from '../../components/sidebar/sidebar.component';
// eslint-disable-next-line
import firebase from '../../firebase/firebase.utils';

import './content.styles.scss';

class ContentComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [
				{
					title: 'Hello',
					text: 'First note yeeeaahh',
				},
				{
					title: 'Second note',
					text: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
				},
				{
					title: 'Another note',
					text: 'fghh',
				},
				{
					title: 'Hello2',
					text: '&glkokkj',
				},
			],
			selectedNoteIndex: null,
		};
	}

	createNewNote = note => {
		this.setState({
			notes: [note, ...this.state.notes]
		})
	}

	selectCurrentNote = noteIndex => {
		this.setState({
			selectedNote: this.state.notes.filter((_, index) => index === noteIndex)[0],
			selectedNoteIndex: noteIndex
		});
	}

	updateNoteText = (text) => {
		this.setState({
			notes: [...this.state.notes.slice(0, this.state.selectedNoteIndex),
			{
				title: this.state.notes[this.state.selectedNoteIndex].title,
				text: text
			},
			...this.state.notes.slice(this.state.selectedNoteIndex + 1)]
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
				/>
				<Editor
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
					updateNoteText={this.updateNoteText}
				/>
			</div>
		);
	}
}

export default ContentComponent;