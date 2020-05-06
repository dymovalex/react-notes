import SignInActionTypes from './sign-in.types';
import { auth } from '../../firebase/firebase.utils';

export const handleInputChange = value => ({
  type: SignInActionTypes.HANDLE_INPUT_CHANGE,
  payload: value
});

export const signInSuccess = () => ({
  type: SignInActionTypes.SIGN_IN_SUCCESS
});

export const signInFailure = error => ({
  type: SignInActionTypes.SIGN_IN_FAILURE,
  payload: error.message
});

export const signInAsync = () => {
  return async (dispatch, getState) => {
    const { email, password } = getState().signIn;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(signInSuccess());
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
};