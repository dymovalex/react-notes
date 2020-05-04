import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import notebookReducer from './notebook/notebook.reducer';
import sidebarReducer from './sidebar/sidebar.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  notebook: notebookReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;