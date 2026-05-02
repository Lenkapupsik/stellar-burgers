import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { RootState } from '@services';
import { TOrderState } from './type';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredients) => {
    const res = await orderBurgerApi(ingredients);

    return {
      _id: res.order._id,
      status: res.order.status,
      name: res.order.name,
      createdAt: res.order.createdAt,
      updatedAt: res.order.updatedAt,
      number: res.order.number,
      ingredients
    };
  }
);

const initialState: TOrderState = {
  orderData: null,
  orderRequest: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderData = null;
      state.orderRequest = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
