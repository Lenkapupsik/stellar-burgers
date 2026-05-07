import reducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice async', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null
  };

  it('pending → isLoading true', () => {
    const state = reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled → записывает данные', () => {
    const mockData = [{ _id: '1', name: 'Булка' }];

    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(mockData as any, '', undefined)
    );

    expect(state.items).toEqual(mockData);
    expect(state.isLoading).toBe(false);
  });

  it('rejected → записывает ошибку', () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('Ошибка'), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
