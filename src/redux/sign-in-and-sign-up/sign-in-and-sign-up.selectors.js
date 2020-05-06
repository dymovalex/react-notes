import { createSelector } from 'reselect';

const selectSignInAndSignUp = state => state.signInAndSignUp;

export const selectMobileView = createSelector(
  [selectSignInAndSignUp],
  (signInAndSignUp) => signInAndSignUp.mobileView
);

export const selectSignInIsShown = createSelector(
  [selectSignInAndSignUp],
  (signInAndSignUp) => signInAndSignUp.signInIsShown
);