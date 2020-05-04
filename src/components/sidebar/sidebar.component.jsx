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

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown)
	}

	handleKeyDown = (e) => {
		if (e.target.className === 'ql-editor' || e.target.className === 'editor__title__input') {
			return;
		} else {
			switch (e.key) {
				case 'Enter':
					if (this.state.addingNote) {
						this.handleSubmit();
					} else {
						this.handleClickNewNoteAndCancelButtons();
					}
					break;

				case 'Escape':
					if (this.state.addingNote) {
						this.handleClickNewNoteAndCancelButtons();
					}
					break;

				case 'ArrowDown':
					if (this.props.selectedNoteIndex || this.props.selectedNoteIndex === 0) {
						if (this.props.selectedNoteIndex + 1 === this.props.notes.length) {
							this.props.selectCurrentNote(0);
						} else {
							this.props.selectCurrentNote(this.props.selectedNoteIndex + 1);
						}
					} else {
						this.props.selectCurrentNote(0);
					}
					break;
				case 'ArrowUp':
					if (this.props.selectedNoteIndex) {
						if (this.props.selectedNoteIndex === 0) {
							this.props.selectCurrentNote(this.props.notes.length - 1);
						} else {
							this.props.selectCurrentNote(this.props.selectedNoteIndex - 1);
						}
					} else {
						this.props.selectCurrentNote(this.props.notes.length - 1);
					}
					break;

				case 'Delete':
					if (this.props.selectedNoteIndex || this.props.selectedNoteIndex === 0) {
						this.props.deleteNote(this.props.selectedNoteIndex);
					}
					break;

				default:
					return null;
			}
		}
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