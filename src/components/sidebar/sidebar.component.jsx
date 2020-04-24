import React from 'react';

import './sidebar.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import Note from '../note/note.component';

class SideBarComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			addingNote: false,
			newNoteTitle: '',
			selectedNote: null,
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
					title: 'Anothe note',
					text: 'fghh',
				},
				{
					title: 'Hello2',
					text: '&glkokkj',
				},
			]
		}
	}

	handleClickNewNoteAndCancelButtons = () => {
		this.setState({
			addingNote: !this.state.addingNote
		});
	};

	handleInputChange = e => {
		this.setState({
			newNoteTitle: e.target.value
		});
	};

	handleSubmit = () => {
		const newNote = {
			title: this.state.newNoteTitle,
			text: '',
			createAt: new Date()
		}
		console.log(newNote);
		this.setState({
			notes: [newNote, ...this.state.notes],
			addingNote: false,
			newNoteTitle: '',
		})
	};

	render() {
		return (
			<div className='sidebar'>
				{
					this.state.addingNote ?
						(<div className='note-creator'>
							<div className='input-container'>
								<input
									type='text'
									placeholder='Enter a note title'
									onChange={(e) => this.handleInputChange(e)}
								>
								</input>
							</div>
							<div className='buttons-container'>
								<CustomButton cancel onClick={this.handleClickNewNoteAndCancelButtons}><i class="fas fa-arrow-left"></i></CustomButton>
								<CustomButton onClick={this.handleSubmit}>submit</CustomButton>
							</div>
						</div>)
						:
						(<div className='buttons-container'>
							<CustomButton onClick={this.handleClickNewNoteAndCancelButtons}>new note</CustomButton>
						</div>)

				}

				{
					this.state.notes.map((note, index) => (
						<Note key={index} note={note} />
					))
				}
			</div>
		);
	}

}

export default SideBarComponent;