/* prettier-ignore */
/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

// Тип для состояния orders
interface OrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

// Асинхронный thunk для получения заказов пользователя
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error) {
      return rejectWithValue('Failed to fetch orders');
    }
  }
);

// Slice
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Обработка getOrders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch orders';
      });
  }
});

// Экспортируем действия
export const { clearOrders } = ordersSlice.actions;

// Селекторы
export const selectOrders = (state: { orders: OrdersState }) => state.orders.orders;
export const selectOrdersLoading = (state: { orders: OrdersState }) => state.orders.loading;
export const selectOrdersError = (state: { orders: OrdersState }) => state.orders.error;

export default ordersSlice.reducer;
