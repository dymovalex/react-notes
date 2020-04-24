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
					createAt: new Date('April 17, 2020 03:24:00'),
					title: 'Hello',
					text: 'First note yeeeaahh',
				},
				{
					createAt: new Date('Febrary 17, 2020'),
					title: 'Second note',
					text: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
				},
				{
					createAt: new Date('December 17, 1995 03:24:00'),
					title: 'Another note',
					text: 'fghh',
				},
				{
					createAt: new Date('December 17, 1995 03:24:00'),
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
				createAt: new Date(),
				title: this.state.notes[this.state.selectedNoteIndex].title,
				text: text
			},
			...this.state.notes.slice(this.state.selectedNoteIndex + 1)]
		});
	}

	updateNoteTitle = (title) => {
		this.setState({
			notes: [...this.state.notes.slice(0, this.state.selectedNoteIndex),
			{
				createAt: new Date(),
				title: title,
				text: this.state.notes[this.state.selectedNoteIndex].text
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
					createNewNote={this.createNewNote}
					updateNoteTitle={this.updateNoteTitle}
					updateNoteText={this.updateNoteText}
				/>
			</div>
		);
	}
}

export default ContentComponent;