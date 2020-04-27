import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import {
    signInWithGoogle,
    signInWithTwitter,
    signInWithGithub
} from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
    return (
        <div className='sign-in'>
            <h2>To keep your notes safe please sign in</h2>
            <div className='buttons-container'>
                <CustomButton googleSignIn onClick={signInWithGoogle}><i className="fab fa-google"></i>SIGN IN WITH GOOGLE</CustomButton>
                <CustomButton twitterSignIn onClick={signInWithTwitter}><i className="fab fa-twitter"></i>SIGN IN WITH TWITTER</CustomButton>
                <CustomButton githubSignIn onClick={signInWithGithub}><i className="fab fa-github"></i>Sign in with Github</CustomButton>
            </div>
        </div>
    );
}

export default SignIn;