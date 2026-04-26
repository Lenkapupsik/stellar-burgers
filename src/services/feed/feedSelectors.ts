import { RootState } from '@services';

export const selectFeed = (state: RootState) => state.feed;

export const selectFeedOrders = (state: RootState) => state.feed.orders;

export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
