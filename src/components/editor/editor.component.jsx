import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './editor.styles.scss';

const Editor = ({ notes, selectedNoteIndex, updateNoteText }) => {
	return (
		<div className='editor'>
			<div className='editor__title'>
				<i className="far fa-edit"></i>
				<span>{notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''}</span>
				{/*<input type='text'></input>*/}
			</div>
			<ReactQuill
				theme='snow'
				value={notes[selectedNoteIndex] ? notes[selectedNoteIndex].text : ''}
				onKeyUp={(e) => updateNoteText(e.target.innerHTML)} />
		</div>
	);
};

export default Editor;