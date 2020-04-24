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
		}
	}

	handleClickEditNoteTitleButton = () => {
		this.setState({
			editingNoteTitle: !this.state.editingNoteTitle
		})
	};

	render() {
		const { notes, selectedNoteIndex, updateNoteTitle, updateNoteText } = this.props;

		return (
			<div className='editor'>
				{
					this.state.editingNoteTitle ?
						(<div className='editor__title'>
							<i className="far fa-check-square" onClick={this.handleClickEditNoteTitleButton}></i>
							<input
								type='text'
								value={notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''}
								onChange={(e) => updateNoteTitle(e.target.value)}
							>
							</input>
						</div>)
						:
						(<div className='editor__title'>
							<i className="far fa-edit" onClick={this.handleClickEditNoteTitleButton}></i>
							<span>{notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''}</span>
						</div>)
				}
				<ReactQuill
					theme='snow'
					value={notes[selectedNoteIndex] ? notes[selectedNoteIndex].text : ''}
					onKeyUp={(e) => updateNoteText(e.target.innerHTML)} />
			</div>
		);
	}
};

export default Editor;