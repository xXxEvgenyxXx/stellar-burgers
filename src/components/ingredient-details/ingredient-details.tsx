/* prettier-ignore */
/* eslint-disable */
import { FC } from 'react';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredients } from '../../services/slices/ingredientsSelectors';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора СДЕЛАНО */
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  
  const ingredientData = id && Array.isArray(ingredients) 
    ? ingredients.find(ingredient => ingredient._id === id) || null 
    : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
