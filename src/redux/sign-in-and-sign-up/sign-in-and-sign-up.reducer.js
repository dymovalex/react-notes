import SignInAndSignUpActionTypes from './sign-in-and-sign-up.types';

const INTIAL_STATE = {
  mobileView: false,
  signInIsShown: true,
};

const signInAndSignUpReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SignInAndSignUpActionTypes.SWITCH_SIGN_IN_SIGN_UP:
      return {
        ...state,
        signInIsShown: !state.signInIsShown
      };

    case SignInAndSignUpActionTypes.HANDLE_RESIZE:
      return {
        ...state,
        mobileView: action.payload
      };

    default:
      return state;
  }
};

export default signInAndSignUpReducer;