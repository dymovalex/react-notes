import React, { useState, useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { SignInAndSignUpContext } from '../../providers/sign-in-and-sign-up/sign-in-and-sign-up.provider';

import {
	auth,
	signInWithGoogle,
	signInWithTwitter,
	signInWithGithub
} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mobileView, switchSignInAndSignUp } = useContext(SignInAndSignUpContext);

	const signIn = async () => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setEmail('');
			setPassword('');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='sign-in'>
			<h2 className='sign-in__title'>Do you have an account already?</h2>
			<span className='sign-in__description'>Sign in with your email and password</span>

			<form className='sign-in__form'>
				<FormInput
					type='email'
					name='email'
					label='Email'
					value={email}
					handleChange={(e) => setEmail(e.target.value)}
					required
				/>
				<FormInput
					type='password'
					name='password'
					label='Password'
					value={password}
					handleChange={(e) => setPassword(e.target.value)}
					required
				/>
			</form>

			<div className='sign-in__buttons-container'>
				<CustomButton onClick={signIn}>Sign in</CustomButton>
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

export default SignIn;