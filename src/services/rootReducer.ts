import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
