import { TIngredient } from '@utils-types';

export type TIngredientState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};
