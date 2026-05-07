import reducer, { createOrder, clearOrder } from './orderSlice';

describe('orderSlice', () => {
  const initialState = {
    orderData: null,
    orderRequest: false,
    error: null
  };

  it('pending', () => {
    const state = reducer(initialState, createOrder.pending('', []));

    expect(state.orderRequest).toBe(true);
  });

  it('fulfilled', () => {
    const mockOrder = { number: 123 };

    const state = reducer(
      initialState,
      createOrder.fulfilled(mockOrder as any, '', [])
    );

    expect(state.orderData).toEqual(mockOrder);
    expect(state.orderRequest).toBe(false);
  });

  it('rejected', () => {
    const state = reducer(
      initialState,
      createOrder.rejected(new Error(), '', [])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.error).toBeDefined();
  });

  it('clearOrder очищает state', () => {
    const state = reducer(
      { orderData: { number: 1 }, orderRequest: true, error: 'err' },
      clearOrder()
    );

    expect(state).toEqual(initialState);
  });
});
