import burgerConstructorReducer, { 
  addIngredient, 
  removeIngredient, 
  moveIngredient,
  setBun,
  clearConstructor,
  initialState
} from '../slices/burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {

  const mockIngredient: TConstructorIngredient = {
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
    id: 'test-id'
  };

  const mockBun: TIngredient = {
    _id: '2',
    name: 'Test Bun',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: 'test-bun.jpg',
    image_mobile: 'test-bun-mobile.jpg',
    image_large: 'test-bun-large.jpg',
  };

  it('должен обработать добавление ингредиента', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual(mockIngredient);
  });

  it('должен обработать удаление ингредиента', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [mockIngredient]
      }
    };

    const action = removeIngredient(mockIngredient.id);
    const state = burgerConstructorReducer(stateWithIngredient, action);

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обработать изменение порядка ингредиентов', () => {
    const ingredient1 = { ...mockIngredient, id: '1' };
    const ingredient2 = { ...mockIngredient, id: '2' };
    
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const action = moveIngredient({ fromIndex: 1, toIndex: 0 });
    const state = burgerConstructorReducer(stateWithIngredients, action);

    expect(state.constructorItems.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('должен обработать установку булки', () => {
    const action = setBun(mockBun);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.constructorItems.bun).toEqual(mockBun);
  });

  it('должен обработать очистку конструктора', () => {
    const stateWithItems = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockIngredient]
      }
    };

    const action = clearConstructor();
    const state = burgerConstructorReducer(stateWithItems, action);

    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
});
