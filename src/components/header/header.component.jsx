import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const HeaderComponent = ({ currentUser }) => {
	return (
		<div className='header'>
			<Link to='/' className='header__logo'>
				<span className='header__logo__first'>React</span>
				<span className='header__logo__second'>Notes</span>
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

export default HeaderComponent;