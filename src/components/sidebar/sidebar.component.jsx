import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import Note from '../note/note.component';
import Spinner from '../spinner/spinner.component';

import './sidebar.styles.scss';

class SideBarComponent extends React.Component {
	constructor() {
		super();

		this.state = {
			addingNote: false,
			newNoteTitle: '',
		};
	}

	handleClickNewNoteAndCancelButtons = () => {
		this.setState(state => ({
			addingNote: !state.addingNote
		}));
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
			<div className={`sidebar ${this.props.sidebarIsClosed ? '' : 'open'}`}>
				{
					this.state.addingNote ?
						(<React.Fragment>
							<div className='input-container'>
								<input
									type='text'
									placeholder='Enter a note title'
									onChange={(e) => this.handleInputChange(e)}
								>
								</input>
							</div>
							<div className='buttons-container'>
								<CustomButton cancel onClick={this.handleClickNewNoteAndCancelButtons}>
									<i className="fas fa-arrow-left"></i>
								</CustomButton>
								<CustomButton onClick={this.handleSubmit}>submit</CustomButton>
							</div>
						</React.Fragment>)
						:
						(<div className='buttons-container'>
							<CustomButton onClick={this.handleClickNewNoteAndCancelButtons}>new note</CustomButton>
						</div>)
				}

				{this.props.notesIsLoading ?
					<Spinner /> :
					(<div className='notes-container'>
						{
							this.props.notes.map((note, index) => (
								<Note
									key={index}
									index={index}
									note={note}
									selectCurrentNote={this.props.selectCurrentNote}
									selected={this.props.selectedNoteIndex === index}
									deleteNote={this.props.deleteNote}
								/>
							))
						}
					</div>)
				}
			</div>
		);
	}
}

export default SideBarComponent;