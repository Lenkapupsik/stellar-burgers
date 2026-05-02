import { RootState } from '@services';

export const selectConstructor = (state: RootState) => state.burgerConstructor;

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;
