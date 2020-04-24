import React from 'react';

import { removeTags } from './note.utils';

import './note.styles.scss';

const Note = ({ note, selected, index, selectCurrentNote, deleteNote }) => {
	return (
		<div className={`${selected ? 'selected' : ''} note`} onClick={() => selectCurrentNote(index)}>
			<div className='note__delete-icon' onClick={() => deleteNote(index)}>
				<i className="fas fa-ban"></i>
			</div>
			<div className='note__timestamp'>
				<span>{note.createAt.toLocaleString()}</span>
			</div>
			< div className='note__title' >
				<h4>{note.title}</h4>
			</div>
			<div className='note__text'>
				<span>{
					note.text.length > 40 ?
						removeTags(note.text.slice(0, 40)) + '...' :
						removeTags(note.text)
				}</span>
			</div>
		</div >
	);
};

export default Note;