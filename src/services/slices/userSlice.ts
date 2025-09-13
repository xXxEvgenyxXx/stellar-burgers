import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  logoutApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserApi();
      return data.user;
    } catch (error) {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(user);
      return data.user;
    } catch (error) {
      return rejectWithValue('Failed to update user data');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue('Failed to register user');
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(userData);
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error) {
      return rejectWithValue('Failed to login user');
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      return;
    } catch (error) {
      return rejectWithValue('Failed to logout');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error = action.payload as string;
      })
      // Update user
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
        state.error = action.payload as string;
      })
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout user
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { setAuthChecked, resetError } = userSlice.actions;
export default userSlice.reducer;
