import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { getOrdersApi, orderBurgerApi, TOrder } from '../../utils/burger-api';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export interface OrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch user orders');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredients);
      return data.order;
    } catch (error) {
      return rejectWithValue('Failed to create order');
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload as string;
      });
  }
});

export const { closeOrderModal } = ordersSlice.actions;
export default ordersSlice.reducer;
