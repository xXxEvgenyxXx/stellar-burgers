import { RootState } from '../store';

export const selectUserOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;
export const selectOrderRequest = (state: RootState) => state.orders.orderRequest;
export const selectOrderModalData = (state: RootState) => state.orders.orderModalData;
