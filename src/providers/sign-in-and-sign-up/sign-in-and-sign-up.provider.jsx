import React, { useState, createContext } from 'react';

export const SignInAndSignUpContext = createContext();

const SignInAndSignUpProvider = ({ children }) => {
  const [mobileView, setMobileView] = useState(false);
  const [signInIsShown, setSignInIsshown] = useState(true);

  const switchSignInAndSignUp = () => {
    setSignInIsshown(!signInIsShown);
  };

  const handleResize = () => {
    if (!mobileView && window.innerWidth < 910) {
      setMobileView(true);
    }
    if (mobileView && window.innerWidth >= 910) {
      setMobileView(false);
    }
  };

  return (
    <SignInAndSignUpContext.Provider
      value={{
        mobileView,
        signInIsShown,
        switchSignInAndSignUp,
        handleResize
      }}
    >
      {children}
    </SignInAndSignUpContext.Provider>
  );
};

export default SignInAndSignUpProvider;