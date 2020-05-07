import React, { useState, useContext } from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { SignInAndSignUpContext } from '../../providers/sign-in-and-sign-up/sign-in-and-sign-up.provider';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mobileView, switchSignInAndSignUp } = useContext(SignInAndSignUpContext);

  const signUp = async () => {
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
      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='sign-up'>
      <h2 className='sign-up__title'>Don't you have an account yet?</h2>
      <span className='sign-up__description'>Sign up with your email and password</span>

      <form className='sign-up__form'>
        <FormInput
          type='text'
          name='displayName'
          label='Display Name'
          value={displayName}
          handleChange={(e) => setDisplayName(e.target.value)}
          required
        />
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
        <FormInput
          type='password'
          name='confirmPassword'
          label='Confirm password'
          value={confirmPassword}
          handleChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </form>

      <div className='sign-up__buttons-container'>
        <CustomButton onClick={signUp}>Sign up</CustomButton>
      </div>

      {
        mobileView ?
          (<div className='sign-up__link-to-sign-in'>
            <span>Do you have an account already? </span>
            <span onClick={switchSignInAndSignUp}>Sign in</span>
          </div>) : null
      }
    </div>
  );
}

export default SignUp;