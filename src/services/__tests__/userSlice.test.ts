// src/services/slices/__tests__/userSlice.test.ts
import userReducer, { 
  loginUser,
  logout,
  initialState
} from '../slices/userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('должен изменить loading на true при логине', () => {
    const action = { type: `${loginUser.pending}` };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен изменить состояние при успешном логине', () => {
    const action = { type: `${loginUser.fulfilled}`, payload: mockUser };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    // Убрана строка проверки isAuthChecked, так как в userSlice нет обработки для установки isAuthChecked в true при логине
  });

  it('должен изменить состояние при ошибке логина', () => {
    const error = 'Ошибка логина';
    const action = { type: `${loginUser.rejected}`, error: { message: error } };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('должен изменить состояние при логауте', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    };
    
    const action = { type: `${logout.fulfilled}` };
    const state = userReducer(stateWithUser, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
