import React from 'react';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import './editor.styles.scss';

class Editor extends React.Component {
	constructor() {
		super();

		this.state = {
			editingNoteTitle: false,
			editedTitle: ''
		};
	}

	handleClickEditNoteTitleButton = () => {
		this.setState(state => ({
			editingNoteTitle: !state.editingNoteTitle
		}))
	};

	handleFocusOnEditor = () => {
		if (this.state.editingNoteTitle) {
			this.handleClickEditNoteTitleButton();
		}
	};

	render() {
		const { notes, selectedNoteIndex, updateNoteTitle, updateNoteText, selectCurrentNote } = this.props;

		return (
			<div className='editor'>
				{
					this.state.editingNoteTitle ?
						(<div className='editor__title'>
							<i className="far fa-check-square" onClick={this.handleClickEditNoteTitleButton}></i>
							<input
								className='editor__title__input'
								type='text'
								value={notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''}
								onChange={(e) => {
									if (selectedNoteIndex || selectedNoteIndex === 0) {
										updateNoteTitle(e.target.value);
									} else {
										const newNote = {
											title: e.target.value,
											text: '',
											createAt: Date.now()
										}

										this.props.createNewNote(newNote);
										selectCurrentNote(0);
									}
								}}
							>
							</input>
						</div>)
						:
						(<div className='editor__title' onClick={this.handleClickEditNoteTitleButton}>
							<i className="far fa-edit"></i>
							<span>{notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''}</span>
						</div>)
				}
				<ReactQuill
					theme='snow'
					value={notes[selectedNoteIndex] ? notes[selectedNoteIndex].text : ''}
					onKeyUp={(e) => {
						if (selectedNoteIndex || selectedNoteIndex === 0) {
							updateNoteText(e.target.innerHTML);
						} else {
							const newNote = {
								title: '',
								text: e.target.innerHTML,
								createAt: Date.now()
							}

							this.props.createNewNote(newNote);
							selectCurrentNote(0);
						}
					}}
					onFocus={this.handleFocusOnEditor}
				/>
			</div>
		);
	}
};


export default Editor;