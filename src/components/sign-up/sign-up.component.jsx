import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { handleInputChange, signUpAsync } from '../../redux/sign-up/sign-up.actions';
import { switchSignInAndSignUp } from '../../redux/sign-in-and-sign-up/sign-in-and-sign-up.actions';
import {
  selectSignUpDisplayName,
  selectSignUpEmail,
  selectSignUpPassword,
  selectSignUpConfirmPassword
} from '../../redux/sign-up/sign-up.selectors';
import { selectMobileView } from '../../redux/sign-in-and-sign-up/sign-in-and-sign-up.selectors';

import './sign-up.styles.scss';

const SignUp = ({ displayName, email, password, confirmPassword, handleInputChange, signUpAsync, mobileView, switchSignInAndSignUp }) => {
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
          handleChange={(e) => handleInputChange({ [e.target.name]: e.target.value })}
          required
        />
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
        <FormInput
          type='password'
          name='confirmPassword'
          label='Confirm password'
          value={confirmPassword}
          handleChange={(e) => handleInputChange({ [e.target.name]: e.target.value })}
          required
        />
      </form>

      <div className='sign-up__buttons-container'>
        <CustomButton onClick={signUpAsync}>Sign up</CustomButton>
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

const mapStateToProps = createStructuredSelector({
  displayName: selectSignUpDisplayName,
  email: selectSignUpEmail,
  password: selectSignUpPassword,
  confirmPassword: selectSignUpConfirmPassword,
  mobileView: selectMobileView,
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: (value) => dispatch(handleInputChange(value)),
  signUpAsync: () => dispatch(signUpAsync()),
  switchSignInAndSignUp: () => dispatch(switchSignInAndSignUp()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);