import { TOrder } from '@utils-types';
import { TFeedState } from '@services/feed/type';

export type FeedUIProps = {
  orders: TOrder[];
  feed: TFeedState;
  readyOrders: number[];
  pendingOrders: number[];
  handleGetFeeds: () => void;
};
