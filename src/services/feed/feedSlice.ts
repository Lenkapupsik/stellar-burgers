import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../../utils/burger-api';
import { TFeedState } from './type';

export const fetchFeed = createAsyncThunk<TFeedsResponse>(
  'feed/fetch',
  async () => await getFeedsApi()
);

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки';
      });
  }
});

export default feedSlice.reducer;
