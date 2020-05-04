import SidebarActionTypes from './sidebar.types';

const INITIAL_STATE = {
  isClosed: false,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SidebarActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        isClosed: !state.isClosed
      };

    default:
      return state;
  }
};

export default sidebarReducer;