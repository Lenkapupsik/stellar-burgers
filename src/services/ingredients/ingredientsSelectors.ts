import { RootState } from '@services';

export const selectIngredients = (state: RootState) => state.ingredients.items;

export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectError = (state: RootState) => state.ingredients.error;
