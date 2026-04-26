import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/ingredientsSlice';
import constructorReducer from './constructor/constructorSlice';
import userReducer from './user/userSlice';
import feedReducer from './feed/feedSlice';
import orderReducer from './order/orderSlice';
import ordersReducer from './order/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  feed: feedReducer,
  order: orderReducer,
  orders: ordersReducer
});
