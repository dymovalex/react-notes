import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { UserContext } from '../../providers/user/user.provider';
import { SidebarContext } from '../../providers/sidebar/sidebar.provider';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ history }) => {
	const { currentUser } = useContext(UserContext);
	const { toggleSidebar } = useContext(SidebarContext);

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