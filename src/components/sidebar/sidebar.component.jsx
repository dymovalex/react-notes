import React from 'react';

import './sidebar.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import Note from '../note/note.component';
import Spinner from '../spinner/spinner.component';

class SideBarComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			addingNote: false,
			newNoteTitle: '',
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
			createAt: Date.now()
		}

		this.props.createNewNote(newNote);

		this.setState({
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
								<CustomButton cancel onClick={this.handleClickNewNoteAndCancelButtons}><i className="fas fa-arrow-left"></i></CustomButton>
								<CustomButton onClick={this.handleSubmit}>submit</CustomButton>
							</div>
						</div>)
						:
						(<div className='buttons-container'>
							<CustomButton onClick={this.handleClickNewNoteAndCancelButtons}>new note</CustomButton>
						</div>)

				}

				{this.props.notesIsLoading ?
					<Spinner /> :
					(this.props.notes.map((note, index) => (
						<Note
							key={index}
							index={index}
							note={note}
							selectCurrentNote={this.props.selectCurrentNote}
							selected={this.props.selectedNoteIndex === index}
							deleteNote={this.props.deleteNote}
						/>
					)))
				}
			</div>
		);
	}

}

export default SideBarComponent;