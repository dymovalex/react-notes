import React, { useContext } from 'react';

import ReactQuill from 'react-quill';

import { NotebookContext } from '../../providers/notebook/notebook.provider';

import 'react-quill/dist/quill.snow.css';
import './editor.styles.scss';

const Editor = () => {
	const {
		notes,
		selectedNoteIndex,
		editingNoteTitle,
		createNewNote,
		selectCurrentNote,
		updateNoteTitle,
		updateNoteText,
		switchEditingNoteTitle
	} = useContext(NotebookContext);

	const handleFocusOnEditor = () => {
		if (editingNoteTitle) {
			switchEditingNoteTitle();
		}
	};

	return (
		<div className='editor'>
			{
				editingNoteTitle ?
					(<div className='editor__title'>
						<i className="far fa-check-square" onClick={switchEditingNoteTitle}></i>
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
									};

									createNewNote(newNote);
									selectCurrentNote(0);
								}
							}}
						>
						</input>
					</div>)
					:
					(<div className='editor__title' onClick={switchEditingNoteTitle}>
						<i className="far fa-edit"></i>
						<span>{notes[selectedNoteIndex] ? notes[selectedNoteIndex].title : ''}</span>
					</div>)
			}
			<ReactQuill
				theme='snow'
				modules={Editor.modules}
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

						createNewNote(newNote);
						selectCurrentNote(0);
					}
				}}
				onFocus={handleFocusOnEditor}
			/>
		</div>
	);
};

Editor.modules = {
	toolbar: [
		[{ size: [] }, { 'font': [] }],
		['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }],
		['blockquote', 'code-block'],
		[{ 'color': [] }, { 'background': [] }],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
		['image'],
		[{ 'align': [] }],
		['clean']
	],
	clipboard: {
		matchVisual: false,
	}
};

export default Editor;