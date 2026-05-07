import { rootReducer } from '../main';

describe('rootReducer', () => {
  it('должен вернуть initial state при UNKNOWN_ACTION', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        isAuth: false,
        isLoading: false,
        isAuthChecked: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      order: {
        orderData: null,
        orderRequest: false,
        error: null
      },
      orders: {
        orders: [],
        isLoading: false,
        error: null
      }
    });
  });
});
