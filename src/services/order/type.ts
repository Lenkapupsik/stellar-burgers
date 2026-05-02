import { TOrder } from '@utils-types';

export type TOrderState = {
  orderData: any | null;
  orderRequest: boolean;
  error: string | null;
};

export type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};
