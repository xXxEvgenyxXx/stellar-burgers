import ingredientsReducer, { 
  fetchIngredients,
  initialState
} from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 100,
      image: 'test.jpg',
      image_mobile: 'test-mobile.jpg',
      image_large: 'test-large.jpg',
    }
  ];

  it('должен изменить loading на true при запросе ингредиентов', () => {
    const action = { type: `${fetchIngredients.pending}` };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен изменить loading на false и сохранить данные при успешном запросе', () => {
    const action = { type: `${fetchIngredients.fulfilled}`, payload: mockIngredients };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен изменить loading на false и сохранить ошибку при неудачном запросе', () => {
    const error = 'Ошибка загрузки';
    const action = { type: `${fetchIngredients.rejected}`, payload: error };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.ingredients).toEqual([]);
  });
});
