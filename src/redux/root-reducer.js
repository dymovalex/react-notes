import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import notebookReducer from './notebook/notebook.reducer';
import sidebarReducer from './sidebar/sidebar.reducer';
import signInReducer from './sign-in/sign-in.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notebook: notebookReducer,
  sidebar: sidebarReducer,
  signIn: signInReducer,
});

export default rootReducer;