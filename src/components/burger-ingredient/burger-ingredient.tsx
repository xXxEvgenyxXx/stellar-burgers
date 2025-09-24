/* prettier-ignore */
/* eslint-disable */
import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient, setBun } from '../../services/slices/burgerConstructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    
    // Получаем ингредиенты из конструктора
    const constructorItems = useSelector((state: RootState) => state.burgerConstructor.constructorItems);
    
    // Вычисляем количество данного ингредиента в конструкторе
    const ingredientCount = constructorItems.ingredients.filter(
      (item: TConstructorIngredient) => item._id === ingredient._id
    ).length + (constructorItems.bun?._id === ingredient._id ? 2 : 0);

    const handleAdd = () => {
      console.log('handleAdd сработал');
      console.log(ingredient.type);
      if (ingredient.type === 'bun') {
        console.log('bun123');
        dispatch(setBun(ingredient));
      } else {
        console.log(ingredient);
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
        count={ingredientCount > 0 ? ingredientCount : null}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
