import React from 'react';

import EditorComponent from '../../components/editor/editor.component';
import SideBarComponent from '../../components/sidebar/sidebar.component';

import firebase from '../../firebase/firebase.utils';

import './content.styles.scss';

class ContentComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: null,
			currentNote: null,
		};
	}

	render() {
		return (
			<div className='content'>
				<SideBarComponent /*notes={notes}*/ />
				<EditorComponent />
			</div>
		);
	}
}

export default ContentComponent;