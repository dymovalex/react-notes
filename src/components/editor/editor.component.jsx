import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './editor.styles.scss';

const EditorComponent = () => {
	return (
		<div className='editor'>
			<ReactQuill theme='snow' />
		</div>
	);
};

export default EditorComponent;