/* prettier-ignore */
/* eslint-disable */
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { addIngredient, setBun } from '../../services/slices/burgerConstructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      console.log('handleAdd сработал')
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        const constructorIngredient: TConstructorIngredient = {
          ...ingredient,
          id: `${ingredient._id}-${Date.now()}` // Уникальный id для каждого ингредиента в конструкторе
        };
        dispatch(addIngredient(constructorIngredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
