import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import {
	signInWithGoogle,
	signInWithTwitter,
	signInWithGithub
} from '../../firebase/firebase.utils';

import { handleInputChange, signInAsync } from '../../redux/sign-in/sign-in.actions';
import { switchSignInAndSignUp } from '../../redux/sign-in-and-sign-up/sign-in-and-sign-up.actions';
import { selectSignInEmail, selectSignInPassword } from '../../redux/sign-in/sign-in.selectors';
import { selectMobileView } from '../../redux/sign-in-and-sign-up/sign-in-and-sign-up.selectors';

import './sign-in.styles.scss';

const SignIn = ({ email, password, handleInputChange, signInAsync, mobileView, switchSignInAndSignUp }) => {
	return (
		<div className='sign-in'>
			<h2 className='sign-in__title'>Do you have an account already?</h2>
			<span className='sign-in__description'>Sign in with your email and password</span>

			<form className='sign-in__form' onSubmit={signInAsync}>
				<FormInput
					type='email'
					name='email'
					label='Email'
					value={email}
					handleChange={(e) => handleInputChange({ [e.target.name]: e.target.value })}
					required
				/>
				<FormInput
					type='password'
					name='password'
					label='Password'
					value={password}
					handleChange={(e) => handleInputChange({ [e.target.name]: e.target.value })}
					required
				/>
			</form>

			<div className='sign-in__buttons-container'>
				<CustomButton onClick={signInAsync}>Sign in</CustomButton>
			</div>
			<span className='sign-in__description'>Or use one of your accounts</span>
			<div className='sign-in__buttons-container'>
				<CustomButton googleSignIn onClick={signInWithGoogle}>
					<i className="fab fa-google"></i>Google
					</CustomButton>
				<CustomButton twitterSignIn onClick={signInWithTwitter}>
					<i className="fab fa-twitter"></i>Twitter
					</CustomButton>
				<CustomButton githubSignIn onClick={signInWithGithub}>
					<i className="fab fa-github"></i>Github
					</CustomButton>
			</div>
			{
				mobileView ?
					(<div className='sign-in__link-to-sign-up'>
						<span>Don't you have an account yet? </span>
						<span onClick={switchSignInAndSignUp}>Sign up</span>
					</div>) : null
			}
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	email: selectSignInEmail,
	password: selectSignInPassword,
	mobileView: selectMobileView,
});

const mapDispatchToProps = dispatch => ({
	handleInputChange: (value) => dispatch(handleInputChange(value)),
	signInAsync: () => dispatch(signInAsync()),
	switchSignInAndSignUp: () => dispatch(switchSignInAndSignUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);