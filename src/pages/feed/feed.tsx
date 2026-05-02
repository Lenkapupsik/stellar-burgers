import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@services';

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import {
  fetchFeed,
  selectFeed,
  selectFeedOrders,
  selectFeedLoading
} from '@services';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const feed = useSelector(selectFeed);
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const readyOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === 'done')
        .map((order) => order.number)
        .slice(0, 20),
    [orders]
  );

  const pendingOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status !== 'done')
        .map((order) => order.number)
        .slice(0, 20),
    [orders]
  );

  return (
    <>
      {isLoading && <Preloader />}

      <FeedUI
        orders={orders}
        feed={feed}
        readyOrders={readyOrders}
        pendingOrders={pendingOrders}
        handleGetFeeds={() => dispatch(fetchFeed())}
      />
    </>
  );
};
