import ordersReducer, { 
  getOrders,
  clearOrders,
  initialState 
} from '../slices/ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Test Order',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 12345
    }
  ];

  it('должен возвращать начальное состояние', () => {
    const state = ordersReducer(undefined, { type: '@@INIT' });
    
    expect(state).toEqual(initialState);
  });

  it('должен изменить loading на true при запросе заказов', () => {
    const action = { type: `${getOrders.pending}` };
    const state = ordersReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен изменить состояние при успешном запросе заказов', () => {
    const action = { type: `${getOrders.fulfilled}`, payload: mockOrders };
    const state = ordersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mockOrders);
  });

  it('должен изменить состояние при ошибке запроса заказов', () => {
    const error = 'Ошибка загрузки заказов';
    const action = { type: `${getOrders.rejected}`, payload: error };
    const state = ordersReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.orders).toEqual([]);
  });

  it('должен очистить заказы при вызове clearOrders', () => {
    const stateWithOrders = {
      ...initialState,
      orders: mockOrders
    };
    
    const action = clearOrders();
    const state = ordersReducer(stateWithOrders, action);

    expect(state.orders).toEqual([]);
  });
});
