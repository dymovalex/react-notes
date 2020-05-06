import SignInActionTypes from './sign-in.types';

const INITIAL_STATE = {
  email: '',
  password: '',
  errorMessage: '',
};

const signInReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SignInActionTypes.HANDLE_INPUT_CHANGE:
      const [[name, value]] = Object.entries(action.payload);
      return {
        ...state,
        [name]: value
      };

    case SignInActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        email: '',
        password: ''
      };

    case SignInActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};

export default signInReducer;