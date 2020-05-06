import SignInAndSignUpActionTypes from './sign-in-and-sign-up.types';

export const switchSignInAndSignUp = () => ({
  type: SignInAndSignUpActionTypes.SWITCH_SIGN_IN_SIGN_UP
});

export const handleResize = () => {
  return (dispatch, getState) => {
    const mobileView = getState().signInAndSignUp.mobileView;
    if (!mobileView && window.innerWidth < 910) {
      dispatch({
        type: SignInAndSignUpActionTypes.HANDLE_RESIZE,
        payload: true
      });
    }
    if (mobileView && window.innerWidth >= 910) {
      dispatch({
        type: SignInAndSignUpActionTypes.HANDLE_RESIZE,
        payload: false
      });
    }
  }
};