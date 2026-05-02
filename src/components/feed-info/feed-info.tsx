import { FC } from 'react';
import { FeedInfoUI } from '../ui/feed-info';
import { FeedInfoUIProps } from '../ui/feed-info/type';

export const FeedInfo: FC<FeedInfoUIProps> = (props) => (
  <FeedInfoUI {...props} />
);
