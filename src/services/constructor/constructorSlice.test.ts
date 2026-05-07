import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './constructorSlice';

const bun = {
  _id: '1',
  id: '1',
  name: 'Булка',
  type: 'bun',
  price: 10,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  image: '',
  image_large: '',
  image_mobile: ''
};

const sauce = {
  _id: '2',
  id: '2',
  name: 'Соус',
  type: 'sauce',
  price: 5,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  image: '',
  image_large: '',
  image_mobile: ''
};

const main = {
  _id: '3',
  id: '3',
  name: 'Котлета',
  type: 'main',
  price: 50,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('constructorSlice', () => {
  it('добавляет булку', () => {
    const state = reducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
  });

  it('добавляет соус', () => {
    const state = reducer(undefined, addIngredient(sauce));

    expect(state.ingredients.length).toBe(1);
  });

  it('добавляет начинку', () => {
    const state = reducer(undefined, addIngredient(main));

    expect(state.ingredients.length).toBe(1);
  });

  it('удаляет ингредиент', () => {
    const initialState = {
      bun: null,
      ingredients: [sauce]
    };

    const state = reducer(initialState, removeIngredient('2'));

    expect(state.ingredients.length).toBe(0);
  });

  it('двигает ингредиент вверх', () => {
    const item1 = { ...sauce, id: '1' };
    const item2 = { ...sauce, id: '2' };

    const state = reducer(
      { bun: null, ingredients: [item1, item2] },
      moveIngredientUp(1)
    );

    expect(state.ingredients[0].id).toBe('2');
  });

  it('двигает ингредиент вниз', () => {
    const item1 = { ...sauce, id: '1' };
    const item2 = { ...sauce, id: '2' };

    const state = reducer(
      { bun: null, ingredients: [item1, item2] },
      moveIngredientDown(0)
    );

    expect(state.ingredients[1].id).toBe('1');
  });

  it('не двигает вверх первый элемент', () => {
    const item1 = { ...sauce, id: '1' };
    const item2 = { ...sauce, id: '2' };

    const initialState = {
      bun: null,
      ingredients: [item1, item2]
    };

    const state = reducer(initialState, moveIngredientUp(0));

    expect(state.ingredients).toEqual([item1, item2]);
  });

  it('не двигает вниз последний элемент', () => {
    const item1 = { ...sauce, id: '1' };
    const item2 = { ...sauce, id: '2' };

    const initialState = {
      bun: null,
      ingredients: [item1, item2]
    };

    const state = reducer(initialState, moveIngredientDown(1));

    expect(state.ingredients).toEqual([item1, item2]);
  });
});
