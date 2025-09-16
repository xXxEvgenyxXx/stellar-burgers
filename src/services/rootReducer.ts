// src/services/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice'; // Добавлено

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feed: feedReducer // Добавлено
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
