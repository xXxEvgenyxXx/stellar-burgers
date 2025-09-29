import feedReducer, { 
  fetchFeed, 
  initialState 
} from '../slices/feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
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

  it('должен изменить loading на true при запросе ленты', () => {
    const action = { type: `${fetchFeed.pending}` };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен изменить состояние при успешном запросе ленты', () => {
    const action = { 
      type: `${fetchFeed.fulfilled}`, 
      payload: { orders: mockOrders, total: 100, totalToday: 10 } 
    };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('должен изменить состояние при ошибке запроса ленты', () => {
    const error = 'Ошибка загрузки ленты';
    const action = { type: `${fetchFeed.rejected}`, payload: error };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
