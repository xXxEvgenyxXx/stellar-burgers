import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import ordersReducer from './slices/ordersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  feed: feedReducer,
  orders: ordersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
