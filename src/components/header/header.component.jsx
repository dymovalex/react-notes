import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser, toggleSidebar, history }) => {
	return (
		<div className='header' onClick={toggleSidebar}>
			<div className='header__bars'>
				{
					history.location.pathname !== '/signin' ?
						<i className="fas fa-bars"></i> :
						null
				}
			</div>
			<Link to='/' className='header__logo'>
				<span>React</span>
				<span>Notes</span>
			</Link>
			<div className='header__sign-in-sign-out'>
				{
					currentUser ?
						<div onClick={() => auth.signOut()}>SIGN OUT</div>
						:
						<Link to='/signin'>SIGN IN</Link>
				}
			</div>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
});

export default connect(mapStateToProps)(withRouter(Header));