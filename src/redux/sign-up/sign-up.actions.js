import SignUpActionTypes from './sign-up.types';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

export const handleInputChange = value => ({
  type: SignUpActionTypes.HANDLE_INPUT_CHANGE,
  payload: value
});

export const signUpSuccess = () => ({
  type: SignUpActionTypes.SIGN_UP_SUCCESS
});

export const signUpFailure = error => ({
  type: SignUpActionTypes.SIGN_UP_FAILURE,
  payload: error.message
});

export const signUpAsync = () => {
  return async (dispatch, getState) => {
    const { displayName, email, password, confirmPassword } = getState().signUp;

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
      dispatch(signUpSuccess());

    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
};