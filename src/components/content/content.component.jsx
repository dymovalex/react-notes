import React from 'react';
import { connect } from 'react-redux';

import Editor from '../../components/editor/editor.component';
import SideBar from '../../components/sidebar/sidebar.component';

import { fetchNotesStartAsync } from '../../redux/notebook/notebook.actions';

import './content.styles.scss';

class Content extends React.Component {

	componentDidMount() {
		const { currentUser, getNotesFromFirebase } = this.props;
		if (currentUser) {
			getNotesFromFirebase(currentUser);
		}
	}

	async componentDidUpdate(prevProps) {
		const { currentUser, getNotesFromFirebase } = this.props;
		if (prevProps.currentUser === null && currentUser) {
			getNotesFromFirebase(currentUser);
		}
	}

	render() {
		return (
			<div className='content'>
				<SideBar />
				<Editor />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	notes: state.notebook.notes,
});

const mapDispatchToProps = dispatch => ({
	getNotesFromFirebase: currentUser => dispatch(fetchNotesStartAsync(currentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);