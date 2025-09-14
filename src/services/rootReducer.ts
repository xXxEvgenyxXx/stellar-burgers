/* prettier-ignore */
/* eslint-disable */
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
