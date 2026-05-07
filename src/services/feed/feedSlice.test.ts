import reducer, { fetchFeed } from './feedSlice';

describe('feedSlice async', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('pending', () => {
    const state = reducer(initialState, fetchFeed.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  it('fulfilled', () => {
    const payload = {
      orders: [{ number: 1 }],
      total: 10,
      totalToday: 5
    };

    const state = reducer(
      initialState,
      fetchFeed.fulfilled(payload as any, '', undefined)
    );

    expect(state.orders.length).toBe(1);
    expect(state.isLoading).toBe(false);
  });

  it('rejected', () => {
    const state = reducer(
      initialState,
      fetchFeed.rejected(new Error(), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
