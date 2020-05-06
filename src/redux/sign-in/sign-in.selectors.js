import { createSelector } from 'reselect';

const selectSignIn = state => state.signIn;

export const selectSignInEmail = createSelector(
  [selectSignIn],
  (signIn) => signIn.email
);

export const selectSignInPassword = createSelector(
  [selectSignIn],
  (signIn) => signIn.password
);