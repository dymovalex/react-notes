import React, { useEffect, useContext } from 'react';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import { SignInAndSignUpContext } from '../../providers/sign-in-and-sign-up/sign-in-and-sign-up.provider';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = () => {
  const { mobileView, signInIsShown, handleResize } = useContext(SignInAndSignUpContext)

  useEffect(() => {
    console.log('Event listener was add')
    window.addEventListener('resize', handleResize);
    handleResize();
    return function () {
      window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <div className='sign-in-and-sign-up'>
      {
        !mobileView ?
          <React.Fragment>
            <SignIn />
            <SignUp />
          </React.Fragment> :

          signInIsShown ?
            <SignIn /> :
            <SignUp />
      }
    </div>
  );
}

export default SignInAndSignUp;