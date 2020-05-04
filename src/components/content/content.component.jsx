import React from 'react';
import { connect } from 'react-redux';

import Editor from '../../components/editor/editor.component';
import SideBar from '../../components/sidebar/sidebar.component';

import { debounce } from '../../components/note/note.utils';
import { getNotesRef } from '../../firebase/firebase.utils';

import './content.styles.scss';

class Content extends React.Component {
	constructor() {
		super();

		this.state = {
			notesRef: null,
			notesIsLoading: true,
		};
	}

	async componentDidMount() {
		if (this.props.currentUser) {
			this.getNotesFromFirebase();
		} else {
			this.setState({
				notesIsLoading: false,
			})
		}
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.currentUser === null && this.props.currentUser) {
			this.getNotesFromFirebase();
			this.setState({
				notesIsLoading: true
			})
		} else if (prevProps.currentUser && this.props.currentUser === null) {
			this.clearState();
		}
	}

	clearState = () => {
		this.setState({
			notes: [],
			selectedNoteIndex: null,
			notesRef: null,
			notesIsLoading: false,
		});
	};

	getNotesFromFirebase = async () => {
		const notesRef = await getNotesRef(this.props.currentUser.id);
		const notesSnapshot = await notesRef.get();
		this.setState({
			notes: notesSnapshot.data().notesOfUser,
			notesRef,
			notesIsLoading: false,
		});
	}

	updateFirebase = debounce(async () => {
		if (this.props.currentUser) {
			await this.state.notesRef.update({ notesOfUser: this.state.notes });
		}
	}, 2000);

	render() {
		return (
			<div className='content'>
				<SideBar
					notesIsLoading={this.state.notesIsLoading}
					sidebarIsClosed={this.props.sidebarIsClosed}
				/>
				<Editor />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.user.currentUser,
	notes: state.notebook.notes,
});

export default connect(mapStateToProps)(Content);