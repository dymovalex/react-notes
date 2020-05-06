import { createSelector } from 'reselect';

const selectSidebar = state => state.sidebar;

export const selectSidebarIsClosed = createSelector(
  [selectSidebar],
  (sidebar) => sidebar.isClosed
);