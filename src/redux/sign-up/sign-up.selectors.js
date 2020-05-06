import { createSelector } from 'reselect';

const selectSignUp = state => state.signUp;

export const selectSignUpDisplayName = createSelector(
  [selectSignUp],
  (signUp) => signUp.displayName
);

export const selectSignUpEmail = createSelector(
  [selectSignUp],
  (signUp) => signUp.email
);

export const selectSignUpPassword = createSelector(
  [selectSignUp],
  (signUp) => signUp.password
);

export const selectSignUpConfirmPassword = createSelector(
  [selectSignUp],
  (signUp) => signUp.confirmPassword
);