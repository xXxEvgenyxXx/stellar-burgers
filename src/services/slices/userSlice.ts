/* prettier-ignore */
/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { 
  loginUserApi, 
  registerUserApi, 
  getUserApi, 
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
};

// Async thunk для логина пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    // Сохраняем токены в localStorage и cookies
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

// Async thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    // Сохраняем токены в localStorage и cookies
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response.user;
  }
);

// Async thunk для получения данных пользователя
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { dispatch }) => {
    try {
      if (getCookie('accessToken')) {
        const response = await getUserApi();
        return response.user;
      }
      return null;
    } catch (error) {
      console.warn('Ошибка при получении данных пользователя: ', error);
      return null;
    } finally { 
      dispatch(setAuthChecked());
    }
  }
);

// Async thunk для обновления данных пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

// Async thunk для выхода пользователя
export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    await logoutApi();
    // Удаляем токены из localStorage и cookies
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при входе';
      })
      // Обработка registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при регистрации';
      })
      // Обработка getUser
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при получении данных пользователя';
      })
      // Обработка updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при обновлении данных пользователя';
      })
      // Обработка logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при выходе';
      });
  },
});

export const { setUser, clearUser, setAuthChecked } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthChecked = (state: { user: UserState }) => state.user.isAuthChecked;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
