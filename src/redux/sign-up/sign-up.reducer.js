import SignUpActionTypes from './sign-up.types';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errorMessage: '',
};

const signUpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SignUpActionTypes.HANDLE_INPUT_CHANGE:
      const [[name, value]] = Object.entries(action.payload);
      return {
        ...state,
        [name]: value
      };

    case SignUpActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };

    case SignUpActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};

export default signUpReducer;