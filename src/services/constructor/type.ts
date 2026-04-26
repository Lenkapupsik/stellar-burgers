import { TIngredient, TConstructorIngredient } from '@utils-types';

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};
