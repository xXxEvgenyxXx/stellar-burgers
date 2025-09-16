/* prettier-ignore */
/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthChecked = true;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, clearUser, setAuthChecked } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthChecked = (state: { user: UserState }) => state.user.isAuthChecked;

export default userSlice.reducer;
