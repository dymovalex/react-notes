import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, googleSignIn, twitterSignIn, githubSignIn, cancel, ...otherProps }) => {
    return (
        <button className={`${googleSignIn ? 'google-sign-in' : ''} ${twitterSignIn ? 'twitter-sign-in' : ''} ${githubSignIn ? 'github-sign-in' : ''} ${cancel ? 'cancel' : ''} custom-button`} {...otherProps}>
            {children}
        </button>
    );
};

export default CustomButton;