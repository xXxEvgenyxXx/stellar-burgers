import rootReducer from '../rootReducer';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('должен корректно инициализировать rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    expect(store.getState()).toBeDefined();
    expect(store.getState().ingredients).toBeDefined();
    expect(store.getState().burgerConstructor).toBeDefined();
    expect(store.getState().user).toBeDefined();
    expect(store.getState().feed).toBeDefined();
    expect(store.getState().orders).toBeDefined();
  });
});
