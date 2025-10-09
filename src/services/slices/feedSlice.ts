/* prettier-ignore */
/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

// Тип для состояния feed
interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

// Асинхронный thunk для получения данных feed
export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch feed data');
    }
  }
);

// Slice
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    // Синхронные редьюсеры, если нужно обновлять состояние напрямую
    clearFeed: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchFeed
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch feed';
      });
  }
});

// Экспортируем действия
export const { clearFeed } = feedSlice.actions;

// Селекторы
export const selectFeed = (state: { feed: FeedState }) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export const selectFeedLoading = (state: { feed: FeedState }) => state.feed.loading;
export const selectFeedError = (state: { feed: FeedState }) => state.feed.error;

export default feedSlice.reducer;
