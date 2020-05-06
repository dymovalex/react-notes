import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import notebookReducer from './notebook/notebook.reducer';
import sidebarReducer from './sidebar/sidebar.reducer';
import signInReducer from './sign-in/sign-in.reducer';
import signUpReducer from './sign-up/sign-up.reducer';
import signInAndSignUpReducer from './sign-in-and-sign-up/sign-in-and-sign-up.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notebook: notebookReducer,
  sidebar: sidebarReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  signInAndSignUp: signInAndSignUpReducer,
});

export default rootReducer;