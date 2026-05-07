import reducer, {
  fetchUser,
  login,
  logoutUser,
  setAuthChecked
} from './userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuth: false,
    isLoading: false,
    isAuthChecked: false,
    error: null
  };

  it('setAuthChecked', () => {
    const state = reducer(initialState, setAuthChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  it('fetchUser.pending', () => {
    const state = reducer(initialState, fetchUser.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  it('fetchUser.fulfilled', () => {
    const user = { name: 'Test', email: 'test@test.com' };

    const state = reducer(
      initialState,
      fetchUser.fulfilled(user as any, '', undefined)
    );

    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('fetchUser.rejected', () => {
    const state = reducer(
      initialState,
      fetchUser.rejected(new Error(), '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('login.fulfilled', () => {
    const user = { name: 'Test' };

    const state = reducer(
      initialState,
      login.fulfilled(user as any, '', { email: '', password: '' })
    );

    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(user);
  });

  it('logoutUser.fulfilled', () => {
    const state = reducer(
      { ...initialState, isAuth: true, user: { name: 'Test' } as any },
      logoutUser.fulfilled(undefined, '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });
});
