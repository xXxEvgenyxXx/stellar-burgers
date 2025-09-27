import { RootState } from '../rootReducer';
import { TIngredient } from '@utils-types';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectBuns = (state: RootState) =>
  state.ingredients.ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === 'bun'
  );

export const selectMains = (state: RootState) =>
  state.ingredients.ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === 'main'
  );

export const selectSauces = (state: RootState) =>
  state.ingredients.ingredients.filter(
    (ingredient: TIngredient) => ingredient.type === 'sauce'
  );
