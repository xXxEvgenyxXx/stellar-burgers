import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectFeedOrdersDone = (state: RootState) => 
  state.feed.orders.filter((order: TOrder) => order.status === 'done');

export const selectFeedOrdersPending = (state: RootState) => 
  state.feed.orders.filter((order: TOrder) => order.status === 'pending');
