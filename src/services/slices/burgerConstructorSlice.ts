/* prettier-ignore */
/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface BurgerConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
      state.constructorItems.ingredients = ingredients;
    },
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setBun,
  clearConstructor,
  setOrderRequest,
  setOrderModalData
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
