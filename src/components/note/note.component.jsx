import React, { useContext } from 'react';

import { NotebookContext } from '../../providers/notebook/notebook.provider';

import { removeTags } from './note.utils';

import './note.styles.scss';

const Note = ({ note, selected, index }) => {
	const { selectCurrentNote, deleteNote } = useContext(NotebookContext);
	const createAt = new Date(note.createAt);

	return (
		<div className={`${selected ? 'selected' : ''} ${window.innerWidth <= 680 ? 'mobile' : ''} note`} onClick={() => selectCurrentNote(index)}>
			<div
				className='note__delete-icon'
				onClick={(e) => {
					e.stopPropagation();
					deleteNote(index);
				}}
			>
				<i className="fas fa-ban"></i>
			</div>
			<div className='note__timestamp'>
				<span>{createAt.toLocaleString()}</span>
			</div>
			<div className='note__title'>
				<h4>{
					note.title.length === 0 ?
						'' :
						!note.title.includes(' ') && note.title.length >= 15 ?
							removeTags(note.title).slice(0, 15) + '...' :
							note.title
				}</h4>
			</div>
			<div className='note__text'>
				<span>{
					note.text.length === 0 ?
						'' :
						!note.text.includes(' ') && note.text.length >= 25 ?
							removeTags(note.text).slice(0, 25) + '...' :
							note.text.length > 120 ?
								removeTags(note.text).slice(0, 120) + '...' :
								removeTags(note.text)
				}</span>
			</div>
		</div>
	);
};

export default Note;