import { RootState } from '@services';

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrderLoading = (state: RootState) => state.orders.isLoading;

export const selectOrderData = (state: RootState) => state.order.orderData;
export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderByNumber = (state: RootState, number: number) =>
  state.feed.orders.find((order) => order.number === number) ||
  state.orders.orders.find((order) => order.number === number);
