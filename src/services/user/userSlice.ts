import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, loginUserApi, logoutApi, updateUserApi } from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';
import { TLoginData } from '@api';

type TUserState = {
  user: TUser | null;
  isAuth: boolean;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

export const fetchUser = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Ошибка получения пользователя');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi({ email, password });

      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);

      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Ошибка входа');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Ошибка выхода');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (
    data: { name: string; email: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Ошибка обновления пользователя');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked(state) {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.isAuthChecked = true;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.isAuthChecked = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
