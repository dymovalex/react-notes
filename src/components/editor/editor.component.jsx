import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './editor.styles.scss';

const EditorComponent = () => {
	return (
		<div className='editor'>
			<div className='editor__title'>
				<i class="far fa-edit"></i>
				<span>Hello world!</span>
				{/*<input type='text'></input>*/}
			</div>
			<ReactQuill theme='snow' />
		</div>
	);
};

export default EditorComponent;