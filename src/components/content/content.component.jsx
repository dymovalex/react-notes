import React, { useContext, useEffect } from 'react';

import Editor from '../../components/editor/editor.component';
import SideBar from '../../components/sidebar/sidebar.component';

import { UserContext } from '../../providers/user/user.provider';
import { NotebookContext } from '../../providers/notebook/notebook.provider';

import './content.styles.scss';

const Content = () => {
	const { currentUser } = useContext(UserContext);
	const { fetchNotesFromFirebase } = useContext(NotebookContext);

	useEffect(() => {
		if (currentUser) {
			fetchNotesFromFirebase(currentUser);
		}
	}, [currentUser]);

	return (
		<div className='content'>
			<SideBar />
			<Editor />
		</div>
	);
}

export default Content;