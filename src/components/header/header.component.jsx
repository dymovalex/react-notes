import React from 'react';

import './header.styles.scss';

const HeaderComponent = ({ currentUser }) => {
	return (
		<div className='header'>
			<div className='header__logo'>
				<span className='header__logo__first'>React</span>
				<span className='header__logo__second'>Notes</span>
			</div>
			<div className='header__sign-in-sign-out'>
				{
					currentUser ?
						<span>SIGN OUT</span> :
						<span>SIGN IN</span>
				}
			</div>
		</div>
	);
};

export default HeaderComponent;