/* prettier-ignore */
/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed, selectFeed, selectFeedLoading } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders } = useSelector(selectFeed);
  const loading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
