import React from 'react';

import './sidebar.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import Note from '../note/note.component';

class SideBarComponent extends React.Component {
	constructor(props) {
		super(props);

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
			createAt: new Date()
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

				{
					this.props.notes.map((note, index) => (
						<Note
							key={index}
							index={index}
							note={note}
							selectCurrentNote={this.props.selectCurrentNote}
							selected={this.props.selectedNoteIndex === index}
						/>
					))
				}
			</div>
		);
	}

}

export default SideBarComponent;