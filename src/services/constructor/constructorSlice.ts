import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from './type';

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index === 0) return;

      const items = state.ingredients;
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      const items = state.ingredients;

      if (index === items.length - 1) return;

      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export default constructorSlice.reducer;
