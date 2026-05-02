import { RootState } from '@services';

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuth = (state: RootState) => state.user.isAuth;

export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
