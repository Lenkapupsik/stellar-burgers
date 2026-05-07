import reducer, { fetchOrders } from './ordersSlice';

describe('ordersSlice async', () => {
  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  it('pending', () => {
    const state = reducer(initialState, fetchOrders.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  it('fulfilled', () => {
    const orders = [{ number: 1 }];

    const state = reducer(
      initialState,
      fetchOrders.fulfilled(orders as any, '', undefined)
    );

    expect(state.orders).toEqual(orders);
    expect(state.isLoading).toBe(false);
  });

  it('rejected', () => {
    const state = reducer(
      initialState,
      fetchOrders.rejected(new Error(), '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeDefined();
  });
});
