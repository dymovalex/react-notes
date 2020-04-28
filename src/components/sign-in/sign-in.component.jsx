import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import {
	auth,
	signInWithGoogle,
	signInWithTwitter,
	signInWithGithub
} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};
	}

	handleSubmit = async () => {
		const { email, password } = this.state;

		try {
			auth.signInWithEmailAndPassword(email, password);

			this.setState({
				email: '',
				password: '',
			});

		} catch (error) {
			console.log(error);
		}
	};

	handleChange = e => {
		const { value, name } = e.target;

		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div className='sign-in'>
				<h2 className='sign-in__title'>Do you have an account already?</h2>
				<span className='sign-in__description'>Sign in with your email and password</span>

				<form className='sign-in__form' onSubmit={this.handleSubmit}>
					<FormInput
						type='email'
						name='email'
						label='Email'
						value={this.state.email}
						handleChange={this.handleChange}
						required
					/>
					<FormInput
						type='password'
						name='password'
						label='Password'
						value={this.state.password}
						handleChange={this.handleChange}
						required
					/>
				</form>

				<div className='sign-in__buttons-container'>
					<CustomButton onClick={this.handleSubmit}>Sign in</CustomButton>
				</div>
				<span className='sign-in__description'>Or with one of these accounts</span>
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
					this.props.mobileView ?
						(<div className='sign-in__link-to-sign-up'>
							<span>Don't you have an account yet? </span>
							<span onClick={this.props.singInSignUpSwitcher}>Sign up</span>
						</div>) : null
				}
			</div>
		);
	}
}

export default SignIn;