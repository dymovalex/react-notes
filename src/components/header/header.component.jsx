import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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

export default withRouter(Header);