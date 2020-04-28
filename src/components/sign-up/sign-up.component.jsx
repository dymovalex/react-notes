import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = async () => {
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
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
      <div className='sign-up'>
        <h2 className='sign-up__title'>Don't you have an account yet?</h2>
        <span className='sign-up__description'>Sign up with your email and password</span>

        <form className='sign-up__form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            label='Display Name'
            value={this.state.displayName}
            handleChange={this.handleChange}
            required
          />
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
          <FormInput
            type='password'
            name='confirmPassword'
            label='Confirm password'
            value={this.state.confirmPassword}
            handleChange={this.handleChange}
            required
          />
        </form>

        <div className='sign-up__buttons-container'>
          <CustomButton onClick={this.handleSubmit}>Sign up</CustomButton>
        </div>

        {
          this.props.mobileView ?
            (<div className='sign-up__link-to-sign-in'>
              <span>Do you have an account already? </span>
              <span onClick={this.props.singInSignUpSwitcher}>Sign in</span>
            </div>) : null
        }
      </div>
    );
  }
}

export default SignUp;